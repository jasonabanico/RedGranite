import { GetItems } from "../../services/itemService/__generated__/GetItems";

export interface IHomePageState {
    items: GetItems["GetItems"] | null;
}