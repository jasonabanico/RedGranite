using HotChocolate;
using RedGranite.Server.Core;
using RedGranite.Server.Data.Repositories;

namespace RedGranite.Server.Data;

public class ItemMutation
{
    private readonly IItemRepository _itemRepository;

    public ItemMutation()
    {
        _itemRepository = new ItemRepository();
    }

    [GraphQLName("AddItem")]
    public Item? AddItemAsync(Item item)
    {
        item.Id = Guid.NewGuid().ToString();
        _itemRepository.AddItem(item);
        return item;
    }
}
