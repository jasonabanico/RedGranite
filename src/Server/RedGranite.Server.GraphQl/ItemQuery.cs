using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using System;

namespace RedGranite.Server.GraphQl;

public class ItemQuery
{
    [UseServiceScope]
    [GraphQLName("GetItem")]
    public async Task<Item> GetItemAsync(string id, [Service] IItemRepository itemRepository) =>
        await itemRepository.GetItemAsync(id);

    [UseServiceScope]
    [GraphQLName("GetItems")]
    public async Task<List<Item>> GetItemsAsync(string? isoMaxDate, int? count, [Service] IItemRepository itemRepository)
    {
        DateTimeOffset maxDate;
        if (!(DateTimeOffset.TryParse(isoMaxDate, out maxDate))) maxDate = DateTimeOffset.MaxValue;
        return await itemRepository.GetItemsAsync(maxDate, count);
    }
}