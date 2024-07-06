/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItems
// ====================================================

export interface GetItems_GetItems {
  __typename: "Item";
  id: string;
  name: string;
  shortDescription: string;
}

export interface GetItems {
  GetItems: GetItems_GetItems[];
}

export interface GetItemsVariables {
  isoStartDate: string;
  count: number;
}
