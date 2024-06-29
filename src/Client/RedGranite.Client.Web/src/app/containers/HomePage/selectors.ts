import { createSelector } from "reselect";
import { IRootState } from "../../types";

const selectHomePage = (state: IRootState) => state.homePage;

export const makeSelectItems = createSelector(
    selectHomePage, 
    (homePage) => homePage.items
);

export const makeSelectInitialLoad = createSelector(
    selectHomePage, 
    (homePage) => homePage.initialLoad
);

export const makeSelectPage = createSelector(
    selectHomePage, 
    (homePage) => homePage.page
);
