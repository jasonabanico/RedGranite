namespace RedGranite.Core
{
    public class Query
    {
        public Item GetItem() =>
            new Item()
            {
                Name = "Item",
                Description = "Description"
            };
    }
}