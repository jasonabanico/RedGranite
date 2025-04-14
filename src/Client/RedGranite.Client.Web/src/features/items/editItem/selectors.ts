import { createSelector } from "reselect";
import { IRootState } from "../../../app/types";

const selectEditItemForm = (state: IRootState) => state.editItemForm;

export const makeSelectItem = createSelector(
    selectEditItemForm, 
    (editItemForm) => editItemForm.item
);