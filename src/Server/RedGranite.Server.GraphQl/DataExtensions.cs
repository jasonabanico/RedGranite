using Microsoft.Extensions.DependencyInjection;
using RedGranite.Server.GraphQl;

namespace RedGranite.Server.GraphQl;

public static class DataExtensions
{
    public static void AddDataServices(this IServiceCollection services)
    {
        services
            .AddGraphQLServer()
            .AddMutationType<ItemMutation>()
            .AddQueryType<ItemQuery>();
    }
}
