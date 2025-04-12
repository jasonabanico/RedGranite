import { createSelector } from "reselect";
import { IRootState } from "../../../app/types";

const selectEditItemPage = (state: IRootState) => state.editItemPage;

export const makeSelectItem = createSelector(
    selectEditItemPage, 
    (editItemPage) => editItemPage.item
);