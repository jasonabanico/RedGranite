/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Item
// ====================================================

export interface Item_item {
  __typename: "Item";
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
}

export interface Item {
  item: Item_item;
}

export interface ItemVariables {
  id: string;
}
