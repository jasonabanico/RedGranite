namespace RedGranite.Server.Core.Exceptions;

/// <summary>
/// Exception thrown when a requested entity is not found.
/// </summary>
public class NotFoundException : Exception
{
    public string EntityType { get; }
    public string EntityId { get; }

    public NotFoundException(string entityType, string entityId)
        : base($"{entityType} with ID '{entityId}' was not found.")
    {
        EntityType = entityType;
        EntityId = entityId;
    }

    public NotFoundException(string entityType, string entityId, Exception innerException)
        : base($"{entityType} with ID '{entityId}' was not found.", innerException)
    {
        EntityType = entityType;
        EntityId = entityId;
    }
}
