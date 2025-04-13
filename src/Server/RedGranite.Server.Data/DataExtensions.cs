using Microsoft.Extensions.DependencyInjection;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Data.Repositories;

namespace RedGranite.Server.Data;

public static class DataExtensions
{
    public static void AddRepositories(this IServiceCollection service)
    {
        service.AddScoped<IItemRepository, ItemRepository>();
    }
}
