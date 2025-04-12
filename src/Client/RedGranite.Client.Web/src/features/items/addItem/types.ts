export interface IAddItemPageState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
