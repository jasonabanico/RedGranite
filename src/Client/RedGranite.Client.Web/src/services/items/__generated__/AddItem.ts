/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ItemInput } from "../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddItem
// ====================================================

export interface AddItem_AddItem {
  __typename: "Item";
  id: string;
}

export interface AddItem {
  AddItem: AddItem_AddItem;
}

export interface AddItemVariables {
  item: ItemInput;
}
