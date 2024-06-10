using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.Cosmos.Repositories;

namespace RedGranite.Server.Data;

public class ItemMutation
{
    [UseServiceScope]
    [GraphQLName("AddItem")]
    public async Task<Item> AddItemAsync(Item item, [Service] IItemRepository itemRepository)
    {
        item.Id = Guid.NewGuid().ToString();
        await itemRepository.AddItemAsync(item);
        return item;
    }
}
