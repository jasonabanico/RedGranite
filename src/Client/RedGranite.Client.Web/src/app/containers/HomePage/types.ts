import { GetItems } from "../../services/itemService/__generated__/GetItems";

export interface IHomePageState {
    initialLoad: boolean;
    page: number;
    items: GetItems["GetItems"] | null;
}