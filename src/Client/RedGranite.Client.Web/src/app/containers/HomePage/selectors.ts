import { createSelector } from "reselect";
import { IRootState } from "../../types";

const selectHomePage = (state: IRootState) => state.homePage;

export const makeSelectItems = createSelector(
    selectHomePage, 
    (homePage) => homePage.items
);