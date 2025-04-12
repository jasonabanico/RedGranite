import { IItemsSectionState } from "./containers/HomePage/types";
import { IAddItemPageState, IEditItemPageState } from "./containers/ItemPage/types";

export interface IRootState {
  itemsSection: IItemsSectionState;
  addItemPage: IAddItemPageState;
  editItemPage: IEditItemPageState;
}