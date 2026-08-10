using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace AgencyBackend
{
    public class Project
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
    }

    public class AgencyDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        public AgencyDbContext(DbContextOptions<AgencyDbContext> options)
            : base(options) { }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddAuthorization();
            builder.Services.AddOpenApi();
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            string? connectionString = builder.Configuration.GetConnectionString(
                "DefaultConnection"
            );
            if (connectionString == null)
            {
                Console.WriteLine("Error: DefaultConnection string not found");
                Environment.Exit(1);
            }

            builder.Services.AddDbContext<AgencyDbContext>(options =>
                options.UseNpgsql(connectionString)
            );

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            app.UseHttpsRedirection();
            app.UseCors();
            app.UseAuthorization();

            app.MapGet(
                    "/",
                    (HttpContext httpContext, AgencyDbContext dbContext) =>
                    {
                        return "Hello ASP.NET\n" + dbContext;
                    }
                )
                .WithName("Get");

            app.MapPost(
                "/projects/add",
                async (HttpContext httpContext, AgencyDbContext dbContext, Project project) =>
                {
                    dbContext.Projects.Add(project);

                    await dbContext.SaveChangesAsync();

                    return Results.Ok();
                }
            );
            app.MapGet(
                "/projects/get/{projectId}",
                async (HttpContext httpContext, AgencyDbContext dbContext, long projectId) =>
                {
                    Project? result = await dbContext.Projects.FindAsync(projectId);
                    if (result != null)
                    {
                        return Results.Ok(result);
                    }
                    else
                    {
                        return Results.NotFound();
                    }
                }
            );

            app.Run();
        }
    }
}
