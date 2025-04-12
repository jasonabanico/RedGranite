import { ItemInput } from "../../../../__generated__/globalTypes";

export interface IAddItemPageState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface IEditItemPageState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    item: ItemInput | null;
}