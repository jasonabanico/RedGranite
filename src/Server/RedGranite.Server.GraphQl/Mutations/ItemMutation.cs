using FluentValidation;
using HotChocolate.Authorization;
using Microsoft.Extensions.Logging;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.GraphQl.Types;
using RedGranite.Server.GraphQl.Validators;
using ValidationException = RedGranite.Server.Core.Exceptions.ValidationException;

namespace RedGranite.Server.GraphQl.Mutations;

/// <summary>
/// GraphQL mutations for Item operations.
/// All mutations require authentication by default.
/// </summary>
[Authorize]
public class ItemMutation
{
    private readonly ILogger<ItemMutation> _logger;

    public ItemMutation(ILogger<ItemMutation> logger)
    {
        _logger = logger;
    }

    [UseServiceScope]
    [GraphQLName("AddItem")]
    public async Task<Item?> AddItemAsync(ItemInput item, [Service] IItemService itemService)
    {
        _logger.LogDebug("AddItem mutation called for: {ItemName}", item.Name);

        // Validate input
        var validator = new ItemInputValidator();
        var validationResult = await validator.ValidateAsync(item);
        
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());
            throw new ValidationException(errors);
        }

        var newItem = Item.Create(item.Name, item.ShortDescription, item.LongDescription);
        return await itemService.AddItemAsync(newItem);
    }

    [UseServiceScope]
    [GraphQLName("UpdateItem")]
    public async Task<Item?> UpdateItemAsync(ItemInput item, [Service] IItemService itemService)
    {
        _logger.LogDebug("UpdateItem mutation called for ID: {ItemId}", item.Id);

        // Validate input with ID requirement
        var validator = new ItemInputUpdateValidator();
        var validationResult = await validator.ValidateAsync(item);
        
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());
            throw new ValidationException(errors);
        }

        var updatedItem = Item.Create(item.Name, item.ShortDescription, item.LongDescription);
        return await itemService.UpdateItemAsync(item.Id, updatedItem);
    }

    [UseServiceScope]
    [GraphQLName("DeleteItem")]
    public async Task<bool> DeleteItemAsync(string id, [Service] IItemService itemService)
    {
        _logger.LogDebug("DeleteItem mutation called for ID: {ItemId}", id);

        if (string.IsNullOrWhiteSpace(id))
        {
            throw new ValidationException("id", "Item ID is required.");
        }

        await itemService.DeleteItemAsync(id);
        return true;
    }
}
