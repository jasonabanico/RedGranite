using FluentValidation;
using RedGranite.Server.GraphQl.Types;

namespace RedGranite.Server.GraphQl.Validators;

/// <summary>
/// FluentValidation validator for ItemInput.
/// </summary>
public class ItemInputValidator : AbstractValidator<ItemInput>
{
    public ItemInputValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

        RuleFor(x => x.ShortDescription)
            .NotEmpty().WithMessage("Short description is required.")
            .MaximumLength(500).WithMessage("Short description must not exceed 500 characters.");

        RuleFor(x => x.LongDescription)
            .NotEmpty().WithMessage("Long description is required.")
            .MaximumLength(5000).WithMessage("Long description must not exceed 5000 characters.");
    }
}

/// <summary>
/// Validator for update operations that require an ID.
/// </summary>
public class ItemInputUpdateValidator : AbstractValidator<ItemInput>
{
    public ItemInputUpdateValidator()
    {
        Include(new ItemInputValidator());

        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Item ID is required for updates.");
    }
}
