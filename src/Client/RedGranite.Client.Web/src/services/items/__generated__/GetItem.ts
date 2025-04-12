/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItem
// ====================================================

export interface GetItem_GetItem {
  __typename: "Item";
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
}

export interface GetItem {
  GetItem: GetItem_GetItem;
}

export interface GetItemVariables {
  id: string;
}
