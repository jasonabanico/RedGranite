using Microsoft.Extensions.DependencyInjection;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Cosmos.Repositories;

namespace RedGranite.Server.Cosmos;

public static class CosmosExtensions
{
    public static void AddRepositories(this IServiceCollection service)
    {
        service.AddScoped<IItemRepository, ItemRepository>();
    }
}
