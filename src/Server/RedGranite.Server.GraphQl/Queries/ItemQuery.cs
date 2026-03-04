using HotChocolate.Authorization;
using Microsoft.Extensions.Logging;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.GraphQl.Queries;

/// <summary>
/// GraphQL queries for Item operations.
/// Queries are open by default. Add [Authorize] attribute to protect specific queries.
/// </summary>
public class ItemQuery
{
    private readonly ILogger<ItemQuery> _logger;

    public ItemQuery(ILogger<ItemQuery> logger)
    {
        _logger = logger;
    }

    [UseServiceScope]
    [GraphQLName("GetItem")]
    // [Authorize] // Uncomment to require authentication
    public async Task<Item?> GetItemAsync(string id, [Service] IItemService itemService)
    {
        _logger.LogDebug("GetItem query called for ID: {ItemId}", id);
        return await itemService.GetItemAsync(id);
    }

    [UseServiceScope]
    [GraphQLName("GetItems")]
    // [Authorize] // Uncomment to require authentication
    public async Task<List<Item>> GetItemsAsync(string? isoMaxDate, int? count, [Service] IItemService itemService)
    {
        _logger.LogDebug("GetItems query called with maxDate: {MaxDate}, count: {Count}", isoMaxDate, count);

        DateTimeOffset maxDate;
        if (!DateTimeOffset.TryParse(isoMaxDate, out maxDate))
        {
            maxDate = DateTimeOffset.MaxValue;
        }

        return await itemService.GetItemsAsync(maxDate, count);
    }
}