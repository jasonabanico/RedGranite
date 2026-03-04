using HotChocolate;
using Microsoft.Extensions.Logging;
using RedGranite.Server.Core.Exceptions;

namespace RedGranite.Server.GraphQl.Errors;

/// <summary>
/// HotChocolate error filter that translates exceptions to structured GraphQL errors.
/// </summary>
public class GraphQlErrorFilter : IErrorFilter
{
    private readonly ILogger<GraphQlErrorFilter> _logger;

    public GraphQlErrorFilter(ILogger<GraphQlErrorFilter> logger)
    {
        _logger = logger;
    }

    public IError OnError(IError error)
    {
        var exception = error.Exception;

        if (exception is null)
        {
            return error;
        }

        return exception switch
        {
            NotFoundException notFoundEx => HandleNotFoundException(error, notFoundEx),
            ValidationException validationEx => HandleValidationException(error, validationEx),
            ArgumentException argEx => HandleArgumentException(error, argEx),
            _ => HandleUnexpectedException(error, exception)
        };
    }

    private IError HandleNotFoundException(IError error, NotFoundException exception)
    {
        _logger.LogWarning("Entity not found: {EntityType} with ID {EntityId}",
            exception.EntityType, exception.EntityId);

        return ErrorBuilder.FromError(error)
            .SetMessage(exception.Message)
            .SetCode("NOT_FOUND")
            .SetExtension("entityType", exception.EntityType)
            .SetExtension("entityId", exception.EntityId)
            .RemoveException()
            .Build();
    }

    private IError HandleValidationException(IError error, ValidationException exception)
    {
        _logger.LogWarning("Validation failed: {Message}", exception.Message);

        var errorBuilder = ErrorBuilder.FromError(error)
            .SetMessage(exception.Message)
            .SetCode("VALIDATION_ERROR")
            .RemoveException();

        foreach (var validationError in exception.Errors)
        {
            errorBuilder.SetExtension(validationError.Key, validationError.Value);
        }

        return errorBuilder.Build();
    }

    private IError HandleArgumentException(IError error, ArgumentException exception)
    {
        _logger.LogWarning("Invalid argument: {Message}", exception.Message);

        return ErrorBuilder.FromError(error)
            .SetMessage(exception.Message)
            .SetCode("INVALID_ARGUMENT")
            .SetExtension("parameterName", exception.ParamName)
            .RemoveException()
            .Build();
    }

    private IError HandleUnexpectedException(IError error, Exception exception)
    {
        _logger.LogError(exception, "Unexpected error occurred: {Message}", exception.Message);

        // In production, don't expose internal error details
        return ErrorBuilder.FromError(error)
            .SetMessage("An unexpected error occurred. Please try again later.")
            .SetCode("INTERNAL_ERROR")
            .RemoveException()
            .Build();
    }
}
