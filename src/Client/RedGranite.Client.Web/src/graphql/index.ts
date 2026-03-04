import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// Get GraphQL endpoint from environment variable
const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL || "http://localhost:5034/graphql";

// HTTP link for GraphQL endpoint
const httpLink = createHttpLink({
    uri: graphqlUrl,
});

// Auth link for injecting authentication token
// TODO: Integrate with your authentication provider (e.g., MSAL)
const authLink = setContext((_, { headers }) => {
    // Get the authentication token from wherever you store it
    // Example: const token = localStorage.getItem('token');
    // Example with MSAL: const token = await msalInstance.acquireTokenSilent(...).accessToken;
    const token: string | null = null; // Replace with actual token retrieval

    return {
        headers: {
            ...headers,
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
    };
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );

            // Handle specific error codes
            switch (extensions?.code) {
                case 'NOT_FOUND':
                    console.warn('Resource not found:', message);
                    break;
                case 'VALIDATION_ERROR':
                    console.warn('Validation error:', message);
                    break;
                case 'AUTH_NOT_AUTHENTICATED':
                    // Handle authentication error - redirect to login
                    console.warn('Authentication required');
                    break;
                default:
                    break;
            }
        });
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});