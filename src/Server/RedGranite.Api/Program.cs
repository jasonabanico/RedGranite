using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;
using RedGranite.Core;

namespace RedGranite.Api
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
                .AddQueryType<Query>();
            builder.Services.AddControllers();

            var app = builder.Build();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.MapGraphQL();
            app.Run();
        }
    }
}