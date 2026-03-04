using Microsoft.Extensions.DependencyInjection;
using RedGranite.Server.GraphQl.Errors;
using RedGranite.Server.GraphQl.Mutations;
using RedGranite.Server.GraphQl.Queries;

namespace RedGranite.Server.GraphQl;

public static class DataExtensions
{
    public static void AddGraphQl(this IServiceCollection services)
    {
        services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddErrorFilter<GraphQlErrorFilter>()
            .AddMutationType<ItemMutation>()
            .AddQueryType<ItemQuery>();
    }
}
