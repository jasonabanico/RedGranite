import { createSelector } from "reselect";
import { IRootState } from "../../../app/types";

const listItemsTable = (state: IRootState) => state.listItemsTable;

export const makeSelectItems = createSelector(
    listItemsTable, 
    (listItemsTable) => listItemsTable.items
);

export const makeSelectInitialLoad = createSelector(
    listItemsTable, 
    (listItemsTable) => listItemsTable.initialLoad
);

export const makeSelectPage = createSelector(
    listItemsTable, 
    (listItemsTable) => listItemsTable.page
);
