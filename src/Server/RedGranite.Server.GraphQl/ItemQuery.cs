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
    public async Task<List<Item>> GetItemsAsync(string isoStartDate, int count, [Service] IItemRepository itemRepository)
    {
        DateTimeOffset startDate;
        if (!(DateTimeOffset.TryParse(isoStartDate, out startDate))) startDate = DateTimeOffset.MaxValue;
        return await itemRepository.GetItemsAsync(startDate, count);
    }
}