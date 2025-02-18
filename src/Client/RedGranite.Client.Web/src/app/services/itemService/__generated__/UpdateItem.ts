/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateItem
// ====================================================

export interface UpdateItem_UpdateItem {
  __typename: "Item";
  id: string;
}

export interface UpdateItem {
  UpdateItem: UpdateItem_UpdateItem;
}

export interface UpdateItemVariables {
  item: ItemInput;
}
