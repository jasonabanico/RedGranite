export interface IAddItemFormState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
