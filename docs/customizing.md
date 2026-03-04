# Extending and Customizing

This guide covers how to extend the RedGranite boilerplate with new features and customize it for your application.

## Backend

### Adding a New Entity

1. **Create the domain model** in `RedGranite.Server.Core/Models/`:
   ```csharp
   public class Product : EntityBase
   {
       public string Name { get; private set; } = string.Empty;
       public decimal Price { get; private set; }
       
       public Product() { } // for deserialization
       
       private Product(string name, decimal price) : base()
       {
           Name = name;
           Price = price;
       }
       
       public static Product Create(string name, decimal price)
       {
           ValidateInputs(name, price);
           return new Product(name, price);
       }
       
       public void Update(string name, decimal price)
       {
           ValidateInputs(name, price);
           Name = name;
           Price = price;
           UpdateLastModified();
       }
       
       private static void ValidateInputs(string name, decimal price)
       {
           if (string.IsNullOrWhiteSpace(name))
               throw new ArgumentException("Name cannot be null or empty.", nameof(name));
           if (price < 0)
               throw new ArgumentException("Price cannot be negative.", nameof(price));
       }
   }
   ```

2. **Create interfaces** in `RedGranite.Server.Core/Interfaces/`:
   - `IProductRepository.cs`
   - `IProductService.cs`

3. **Create repository** in `RedGranite.Server.Data/Repositories/`:
   - Add `ProductRepository.cs` implementing `IProductRepository`
   - Add `DbSet<Product>` to `AppDbContext.cs`

4. **Create service** in `RedGranite.Server.Services/`:
   - Add `ProductService.cs` with logging and error handling
   - Register in `ServiceExtensions.cs`

5. **Create GraphQL types** in `RedGranite.Server.GraphQl/`:
   - Add `ProductInput.cs` in `Types/`
   - Add `ProductInputValidator.cs` in `Validators/`
   - Add `ProductQuery.cs` in `Queries/`
   - Add `ProductMutation.cs` in `Mutations/`
   - Register in `DataExtensions.cs`

### Adding Custom Exceptions

Create exception types in `RedGranite.Server.Core/Exceptions/`:

```csharp
public class BusinessRuleException : Exception
{
    public string RuleCode { get; }

    public BusinessRuleException(string ruleCode, string message) : base(message)
    {
        RuleCode = ruleCode;
    }
}
```

Then handle them in `GraphQlErrorFilter.cs`.

### Configuring Authentication

Authentication is configured for Azure AD by default. To customize:

1. Update `appsettings.json` with your Azure AD settings
2. For different providers (e.g., Auth0, Okta), modify `Program.cs`:
   ```csharp
   builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
       .AddJwtBearer(options =>
       {
           options.Authority = "https://your-authority.com";
           options.Audience = "your-audience";
       });
   ```

### Authorization

Mutations are protected by `[Authorize]` by default. To customize:

- Add policy-based authorization:
  ```csharp
  [Authorize(Policy = "AdminOnly")]
  public async Task<Product?> DeleteProductAsync(...)
  ```

- Configure policies in `Program.cs`:
  ```csharp
  builder.Services.AddAuthorization(options =>
  {
      options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
  });
  ```

## Frontend

### Adding a New Feature

Follow the feature-based structure in `src/features/`:

1. **Create feature folder**: `src/features/products/`

2. **Add components**:
   - `listProducts/listProductsTable.tsx`
   - `addProduct/addProductForm.tsx`
   - `editProduct/editProductForm.tsx`

3. **Add Redux slice**: `listProductsTableSlice.ts`
   ```typescript
   import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
   
   export const fetchProducts = createAsyncThunk(
       'products/fetchProducts',
       async (_, { rejectWithValue }) => {
           try {
               return await productService.getProducts();
           } catch (err: any) {
               return rejectWithValue(err.message);
           }
       }
   );
   ```

4. **Add service**: `src/services/products/`
   - `index.ts` - service class
   - `queries.ts` - GraphQL queries
   - `mutations.ts` - GraphQL mutations

5. **Add routes** in `App.tsx`

### Form Validation

Use Zod schemas for client-side validation:

```typescript
import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().min(0, 'Price must be positive'),
});
```

### Environment Configuration

Configure environment variables in `.env.development` and `.env.production`:

```
REACT_APP_GRAPHQL_URL=http://localhost:5034/graphql
REACT_APP_AUTH_CLIENT_ID=your-client-id
```

Access in code:
```typescript
const apiUrl = process.env.REACT_APP_GRAPHQL_URL;
```

### Adding Authentication

Update `src/graphql/index.ts` to inject auth tokens:

```typescript
const authLink = setContext(async (_, { headers }) => {
    // Get token from your auth provider
    const token = await getAccessToken();
    
    return {
        headers: {
            ...headers,
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
    };
});
```

### Error Handling

Use the `ErrorBoundary` component for crash recovery:

```tsx
<ErrorBoundary fallback={<CustomErrorFallback />}>
    <YourComponent />
</ErrorBoundary>
```

Use `ErrorAlert` for displaying API errors:

```tsx
{error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
```

## Testing

### Server-Side Tests

Run tests:
```bash
cd src
dotnet test
```

Add new tests in the corresponding test project:
- `RedGranite.Server.Core.Tests` - Domain model tests
- `RedGranite.Server.Services.Tests` - Service layer tests with mocked repositories

### Client-Side Tests

Run tests:
```bash
cd src/Client/RedGranite.Client.Web
npm test
```

## Code Style

### Backend
- Use `ILogger<T>` for logging
- Throw custom exceptions (`NotFoundException`, `ValidationException`)
- Use FluentValidation for input validation
- Follow repository pattern with interface-based DI

### Frontend
- Use typed Redux hooks (`useAppDispatch`, `useAppSelector`)
- Use Zod for form validation
- Handle loading and error states in components
- Use generated GraphQL types for type safety