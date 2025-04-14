import { ItemInput } from "../../../../__generated__/globalTypes";

export interface IEditItemFormState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    item: ItemInput | null;
}