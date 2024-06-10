using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.Cosmos.Repositories;

namespace RedGranite.Server.GraphQl;

public class ItemQuery
{
    private readonly IItemRepository _itemRepository;

    public ItemQuery(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    [UseServiceScope]
    [GraphQLName("GetItem")]
    public async Task<Item> GetItemAsync(string id) =>
        await _itemRepository.GetItemAsync(id);

    [UseServiceScope]
    [GraphQLName("GetItems")]
    public async Task<List<Item>> GetItemsAsync(int page, int perPage) =>
        await _itemRepository.GetItemsAsync(page, perPage);
}