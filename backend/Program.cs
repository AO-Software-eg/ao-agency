namespace AgencyBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddAuthorization();
            builder.Services.AddOpenApi();

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapGet(
                    "/",
                    (HttpContext httpContext) =>
                    {
                        return "Hello ASP.NET";
                    }
                )
                .WithName("Get");

            app.Run();
        }
    }
}
