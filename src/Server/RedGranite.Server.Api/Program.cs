using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using RedGranite.Server.Data;
using RedGranite.Server.GraphQl;
using RedGranite.Server.Services;
using System.Text.Json;

namespace RedGranite.Server.Api;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Authentication
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
        
        // Database
        var connectionString = builder.Configuration.GetConnectionString("CosmosConnection");
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseCosmos(connectionString!, "RedGranite"));
        
        // Application services
        builder.Services.AddRepositories();
        builder.Services.AddServices();
        builder.Services.AddGraphQl();
        
        // CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                corsBuilder =>
                {
                    var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() 
                        ?? new[] { "http://localhost:3000" };
                    
                    corsBuilder.WithOrigins(allowedOrigins)
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
        });
        
        builder.Services.AddControllers();

        var app = builder.Build();

        // Ensure database is created at startup
        await EnsureDatabaseCreatedAsync(app);
        
        // Global exception handler for non-GraphQL endpoints
        app.UseExceptionHandler(errorApp =>
        {
            errorApp.Run(async context =>
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                
                var exceptionHandler = context.Features.Get<IExceptionHandlerFeature>();
                if (exceptionHandler != null)
                {
                    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
                    logger.LogError(exceptionHandler.Error, "Unhandled exception occurred");
                    
                    var response = new
                    {
                        error = "An unexpected error occurred.",
                        traceId = context.TraceIdentifier
                    };
                    
                    await context.Response.WriteAsync(JsonSerializer.Serialize(response));
                }
            });
        });

        app.UseCors("AllowSpecificOrigin");
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.MapGraphQL();
        
        app.Run();
    }

    private static async Task EnsureDatabaseCreatedAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        
        try
        {
            await dbContext.Database.EnsureCreatedAsync();
            logger.LogInformation("Database initialized successfully");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initializing the database");
            throw;
        }
    }
}