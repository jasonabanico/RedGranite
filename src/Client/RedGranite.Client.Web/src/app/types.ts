import { IItemsSectionState } from "./containers/HomePage/types";
import { IEditItemPageState } from "./containers/ItemPage/types";

export interface IRootState {
  itemsSection: IItemsSectionState;
  editItemPage: IEditItemPageState;
}