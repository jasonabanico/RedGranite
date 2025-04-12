import { IAddItemPageState } from "../features/items/addItem/types";
import { IEditItemPageState } from "../features/items/editItem/types";
import { IListItemsPageState } from "../features/items/listItems/types";

export interface IRootState {
  listItemsPage: IListItemsPageState;
  addItemPage: IAddItemPageState;
  editItemPage: IEditItemPageState;
}