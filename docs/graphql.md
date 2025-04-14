# GraphQL

## Using the GraphQL API
- The GraphQL API is available at `http://localhost:5034/graphql` (or the server's port).
- Use tools like GraphiQL or Postman to test queries and mutations.

### Queries
1. GetItems - To retrieve a list of items, use the GetItems query. This returns all items with their details.
   ```graphql
    query {
        GetItems {
            id
            name
            shortDescription
        }
    }
    ```

2. Get Item - To retrieve a single item by its id, use the GetItem query.
   ```graphql
    query {
        GetItem(id: "some-item-id") {
            id
            name
            shortDescription
            longDescription
            created
            lastModified
        }
    }
    ```

### Mutations
1. Add Item - Use the AddItem mutation to create a new item. Provide an ItemInput object with id, name, shortDescription, and longDescription.
    ```graphql
    mutation {
        AddItem(item: {
            id: "unique-id",
            name: "New Item",
            shortDescription: "Short description",
            longDescription: "Long description"
        }) {
            id
            name
            shortDescription
            longDescription
            created
            lastModified
        }
    }
    ```

2. Update Item - Use the UpdateItem mutation to modify an existing item. Specify the id of the item and the updated values in the ItemInput object.
    ```graphql
    mutation {
        UpdateItem(item: {
            id: "existing-id",
            name: "Updated Item",
            shortDescription: "Updated short description",
            longDescription: "Updated long description"
        }) {
            id
            name
            shortDescription
            longDescription
            created
            lastModified
        }
    }
    ```

3. Delete Item - Use the DeleteItem mutation to remove an item by its id. This returns a Boolean indicating success.
    ```graphql
    mutation {
        DeleteItem(id: "existing-id")
    }    
    ```
