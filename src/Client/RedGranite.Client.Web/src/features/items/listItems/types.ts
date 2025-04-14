import { GetItems } from "../../../services/items/__generated__/GetItems";

export interface IListItemsTableState {
    initialLoad: boolean;
    page: number;
    items: GetItems["GetItems"] | null;
}