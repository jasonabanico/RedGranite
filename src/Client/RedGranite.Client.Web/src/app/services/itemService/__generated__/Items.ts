/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Items
// ====================================================

export interface Items_items {
  __typename: "Item";
  id: string;
  name: string;
  shortDescription: string;
}

export interface Items {
  items: Items_items[];
}

export interface ItemsVariables {
  page: number;
  perPage: number;
}
