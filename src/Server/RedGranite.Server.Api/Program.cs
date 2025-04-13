using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using RedGranite.Server.Cosmos;
using RedGranite.Server.GraphQl;
using RedGranite.Server.Services;

namespace RedGranite.Server.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
        var connectionString = builder.Configuration.GetConnectionString("CosmosConnection");
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseCosmos(connectionString, "RedGranite"));
        builder.Services.AddRepositories();
        builder.Services.AddServices();
        builder.Services.AddGraphQl();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
        });
        builder.Services.AddControllers();

        var app = builder.Build();
        //app.UseHttpsRedirection();
        app.UseCors("AllowSpecificOrigin");
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.MapGraphQL();
        app.Run();
    }
}