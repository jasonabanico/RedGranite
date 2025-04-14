import { IAddItemFormState } from "../features/items/addItem/types";
import { IEditItemFormState } from "../features/items/editItem/types";
import { IListItemsTableState } from "../features/items/listItems/types";

export interface IRootState {
  listItemsTable: IListItemsTableState;
  addItemForm: IAddItemFormState;
  editItemForm: IEditItemFormState;
}