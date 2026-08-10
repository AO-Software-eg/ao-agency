using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace AgencyBackend
{
    public class Project
    {
        public long id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }

    public class AgencyDbContext : DbContext
    {
        public DbSet<Project> projects { get; set; }

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
            app.UseAuthorization();

            app.MapGet(
                    "/",
                    (HttpContext httpContext, AgencyDbContext dbContext) =>
                    {
                        return "Hello ASP.NET\n" + dbContext;
                    }
                )
                .WithName("Get");

            app.Run();
        }
    }
}
