using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.GraphQl.Types;

namespace RedGranite.Server.GraphQl.Mutations;

public class ItemMutation
{
    [UseServiceScope]
    [GraphQLName("AddItem")]
    public async Task<Item?> AddItemAsync(ItemInput item, [Service] IItemService itemService)
    {
        var newItem = Item.Create(item.Name, item.ShortDescription, item.LongDescription);
        return await itemService.AddItemAsync(newItem);
    }

    [UseServiceScope]
    [GraphQLName("UpdateItem")]
    public async Task<Item?> UpdateItemAsync(ItemInput item, [Service] IItemService itemService)
    {
        var updatedItem = Item.Create(item.Name, item.ShortDescription, item.LongDescription);
        return await itemService.UpdateItemAsync(item.Id, updatedItem);
    }

    [UseServiceScope]
    [GraphQLName("DeleteItem")]
    public async Task<bool> DeleteItemAsync(string id, [Service] IItemService itemService)
    {
        await itemService.DeleteItemAsync(id);
        return true;
    }
}
