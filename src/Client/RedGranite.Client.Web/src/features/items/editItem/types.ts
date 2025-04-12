import { ItemInput } from "../../../../__generated__/globalTypes";

export interface IEditItemPageState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    item: ItemInput | null;
}