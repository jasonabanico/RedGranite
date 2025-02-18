import { GetItem } from "../../services/itemService/__generated__/GetItem";

export interface IEditItemPageState {
    initialLoad: boolean;
    item: GetItem["GetItem"] | null;
}