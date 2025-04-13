namespace RedGranite.Server.Core.Models;

public class Item : EntityBase
{
    public string Name { get; private set; }
    public string ShortDescription { get; private set; }
    public string LongDescription { get; private set; }

    public Item() { } // for deserialization

    private Item(string name, string shortDescription, string longDescription) : base()
    {
        Name = name;
        ShortDescription = shortDescription;
        LongDescription = longDescription;
    }

    public static Item Create(string name, string shortDescription, string longDescription)
    {
        ValidateInputs(name, shortDescription, longDescription);
        return new Item(name, shortDescription, longDescription);
    }

    public void Update(string name, string shortDescription, string longDescription)
    {
        ValidateInputs(name, shortDescription, longDescription);

        Name = name;
        ShortDescription = shortDescription;
        LongDescription = longDescription;

        UpdateLastModified();
    }

    private static void ValidateInputs(string name, string shortDescription, string longDescription)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name cannot be null or empty.", nameof(name));

        if (string.IsNullOrWhiteSpace(shortDescription))
            throw new ArgumentException("Short description cannot be null or empty.", nameof(shortDescription));

        if (string.IsNullOrWhiteSpace(longDescription))
            throw new ArgumentException("Long description cannot be null or empty.", nameof(longDescription));
    }
}
