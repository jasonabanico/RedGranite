import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from "@reduxjs/toolkit";
import listItemsPageReducer from "../features/items/listItems/listItemsPageSlice";
import addItemPageReducer from "../features/items/addItem/addItemPageSlice";
import editItemPageReducer from '../features/items/editItem/editItemPageSlice';
import ReduxLogger from "redux-logger";

const rootReducer = combineReducers({
  listItemsPage: listItemsPageReducer,
  addItemPage: addItemPageReducer,
  editItemPage: editItemPageReducer,
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