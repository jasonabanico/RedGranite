using Microsoft.Extensions.DependencyInjection;
using RedGranite.Server.Core.Interfaces;

namespace RedGranite.Server.Services;

public static class ServiceExtensions
{
    public static void AddServices(this IServiceCollection service)
    {
        service.AddScoped<IItemService, ItemService>();
    }
}
