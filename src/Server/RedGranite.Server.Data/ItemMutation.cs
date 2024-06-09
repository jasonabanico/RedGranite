using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.Cosmos.Repositories;

namespace RedGranite.Server.Data;

public class ItemMutation
{
    private readonly IItemRepository _itemRepository;

    public ItemMutation(IItemRepository itemRepository)
    {
        _itemRepository = itemRepository;
    }

    [GraphQLName("AddItem")]
    public async Task<Item> AddItemAsync(Item item)
    {
        item.Id = Guid.NewGuid().ToString();
        await _itemRepository.AddItemAsync(item);
        return item;
    }
}
