import { ApolloError } from "@apollo/client";
import { apolloClient } from "../../graphql";
import { GET_ITEM, GET_ITEMS } from "./queries";
import { GetItem } from "./__generated__/GetItem";
import { GetItems } from "./__generated__/GetItems";
import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "./mutations";
import { AddItem } from "./__generated__/AddItem";
import { UpdateItem } from "./__generated__/UpdateItem";
import { ItemInput } from "../../../__generated__/globalTypes";

/**
 * Custom error class for service-level errors with user-friendly messages.
 */
export class ServiceError extends Error {
  public readonly code: string;
  public readonly originalError?: Error;

  constructor(message: string, code: string, originalError?: Error) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.originalError = originalError;
  }
}

/**
 * Extract user-friendly error message from Apollo errors.
 */
function extractErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApolloError) {
    // Check for GraphQL errors with codes
    const graphQLError = error.graphQLErrors?.[0];
    if (graphQLError) {
      const code = graphQLError.extensions?.code as string | undefined;
      
      switch (code) {
        case 'NOT_FOUND':
          return 'The requested item was not found.';
        case 'VALIDATION_ERROR':
          return graphQLError.message || 'Validation failed. Please check your input.';
        case 'AUTH_NOT_AUTHENTICATED':
          return 'You must be logged in to perform this action.';
        default:
          return graphQLError.message || fallback;
      }
    }
    
    // Network error
    if (error.networkError) {
      return 'Unable to connect to the server. Please check your connection.';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return fallback;
}

/**
 * Extract error code from Apollo errors.
 */
function extractErrorCode(error: unknown): string {
  if (error instanceof ApolloError) {
    const code = error.graphQLErrors?.[0]?.extensions?.code as string | undefined;
    if (code) return code;
    if (error.networkError) return 'NETWORK_ERROR';
  }
  return 'UNKNOWN_ERROR';
}

/**
 * Item service for GraphQL operations.
 * Uses factory function instead of singleton for better testability.
 */
class ItemService {
  async getItem(id: string | undefined): Promise<GetItem> {
    if (!id) {
      throw new ServiceError('Item ID is required.', 'VALIDATION_ERROR');
    }

    try {
      const response = await apolloClient.query({
        query: GET_ITEM,
        variables: { id },
        fetchPolicy: 'network-only', // Don't cache single item queries
      });

      if (!response?.data) {
        throw new ServiceError('Item not found.', 'NOT_FOUND');
      }

      return response.data;
    } catch (error) {
      throw new ServiceError(
        extractErrorMessage(error, 'Failed to get item.'),
        extractErrorCode(error),
        error instanceof Error ? error : undefined
      );
    }
  }
   
  async getItems(isoDateString: string, count = 20): Promise<GetItems["GetItems"]> {
    try {
      const response = await apolloClient.query({
        query: GET_ITEMS,
        variables: { isoDateString, count },
      });

      if (!response?.data) {
        throw new ServiceError('Failed to retrieve items.', 'DATA_ERROR');
      }

      return response.data.GetItems;
    } catch (error) {
      throw new ServiceError(
        extractErrorMessage(error, 'Failed to get items.'),
        extractErrorCode(error),
        error instanceof Error ? error : undefined
      );
    }
  }
  
  async addItem(item: ItemInput): Promise<AddItem> {
    try {
      const response = await apolloClient.mutate({
        mutation: ADD_ITEM,
        variables: { item },
      });

      if (!response?.data) {
        throw new ServiceError('Failed to add item.', 'MUTATION_ERROR');
      }

      return response.data;
    } catch (error) {
      throw new ServiceError(
        extractErrorMessage(error, 'Failed to add item.'),
        extractErrorCode(error),
        error instanceof Error ? error : undefined
      );
    }
  }

  async updateItem(item: ItemInput): Promise<UpdateItem> {
    if (!item.id) {
      throw new ServiceError('Item ID is required for updates.', 'VALIDATION_ERROR');
    }

    try {
      const response = await apolloClient.mutate({
        mutation: UPDATE_ITEM,
        variables: { item },
      });

      if (!response?.data) {
        throw new ServiceError('Failed to update item.', 'MUTATION_ERROR');
      }

      return response.data;
    } catch (error) {
      throw new ServiceError(
        extractErrorMessage(error, 'Failed to update item.'),
        extractErrorCode(error),
        error instanceof Error ? error : undefined
      );
    }
  }

  async deleteItem(id: string): Promise<boolean> {
    if (!id) {
      throw new ServiceError('Item ID is required.', 'VALIDATION_ERROR');
    }

    try {
      const response = await apolloClient.mutate({
        mutation: DELETE_ITEM,
        variables: { id },
      });
  
      if (!response?.data) {
        throw new ServiceError('Failed to delete item.', 'MUTATION_ERROR');
      }
  
      return response.data.DeleteItem ?? false;
    } catch (error) {
      throw new ServiceError(
        extractErrorMessage(error, 'Failed to delete item.'),
        extractErrorCode(error),
        error instanceof Error ? error : undefined
      );
    }
  }  
}

/**
 * Factory function to create ItemService instance.
 * For production use, use the default export.
 * For testing, call createItemService() with mocked dependencies.
 */
export function createItemService(): ItemService {
  return new ItemService();
}

// Default instance for convenience
const itemService = createItemService();
export default itemService;