using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.GraphQl;

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
