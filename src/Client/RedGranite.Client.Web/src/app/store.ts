import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from "@reduxjs/toolkit";
import listItemsTableReducer from "../features/items/listItems/listItemsTableSlice";
import addItemFormReducer from "../features/items/addItem/addItemFormSlice";
import editItemFormReducer from '../features/items/editItem/editItemFormSlice';
import ReduxLogger from "redux-logger";

const rootReducer = combineReducers({
  listItemsTable: listItemsTableReducer,
  addItemForm: addItemFormReducer,
  editItemForm: editItemFormReducer,
});

export const store = configureStore({
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxLogger),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;