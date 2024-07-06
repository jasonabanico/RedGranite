using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.GraphQl;

public class ItemQuery
{
    [UseServiceScope]
    [GraphQLName("GetItem")]
    public async Task<Item> GetItemAsync(string id, [Service] IItemRepository itemRepository) =>
        await itemRepository.GetItemAsync(id);

    [UseServiceScope]
    [GraphQLName("GetItems")]
    public async Task<List<Item>> GetItemsAsync(int page, int perPage, [Service] IItemRepository itemRepository) =>
        await itemRepository.GetItemsAsync(page, perPage);
}