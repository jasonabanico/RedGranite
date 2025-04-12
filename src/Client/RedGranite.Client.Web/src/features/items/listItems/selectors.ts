import { createSelector } from "reselect";
import { IRootState } from "../../../app/types";

const listItemsPage = (state: IRootState) => state.listItemsPage;

export const makeSelectItems = createSelector(
    listItemsPage, 
    (listItemsPage) => listItemsPage.items
);

export const makeSelectInitialLoad = createSelector(
    listItemsPage, 
    (listItemsPage) => listItemsPage.initialLoad
);

export const makeSelectPage = createSelector(
    listItemsPage, 
    (listItemsPage) => listItemsPage.page
);
