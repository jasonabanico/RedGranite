import { createSelector } from "reselect";
import { IRootState } from "../../types";

const selectEditItemPage = (state: IRootState) => state.editItemPage;

export const makeSelectItem = createSelector(
    selectEditItemPage, 
    (editItemPage) => editItemPage.item
);

export const makeSelectInitialLoad = createSelector(
    selectEditItemPage, 
    (editItemPage) => editItemPage.initialLoad
);
