using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using RedGranite.Server.Data;
using RedGranite.Server.GraphQl;

namespace RedGranite.Server.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
            builder.Services
                .AddGraphQLServer()
                .AddMutationType<ItemMutation>()
                .AddQueryType<ItemQuery>();
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
}