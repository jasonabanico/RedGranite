import { createSelector } from "reselect";
import { IRootState } from "../../types";

const selectItemsSection = (state: IRootState) => state.itemsSection;

export const makeSelectItems = createSelector(
    selectItemsSection, 
    (itemsSection) => itemsSection.items
);

export const makeSelectInitialLoad = createSelector(
    selectItemsSection, 
    (itemsSection) => itemsSection.initialLoad
);

export const makeSelectPage = createSelector(
    selectItemsSection, 
    (itemsSection) => itemsSection.page
);
