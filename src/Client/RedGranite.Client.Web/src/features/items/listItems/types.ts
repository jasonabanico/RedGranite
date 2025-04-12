import { GetItems } from "../../../services/items/__generated__/GetItems";

export interface IListItemsPageState {
    initialLoad: boolean;
    page: number;
    items: GetItems["GetItems"] | null;
}