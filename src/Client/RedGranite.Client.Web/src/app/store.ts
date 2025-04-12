import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from "@reduxjs/toolkit";
import itemsSectionReducer from "./containers/HomePage/itemsSectionSlice";
import addItemPageReducer from "./containers/ItemPage/addItemPageSlice";
import editItemPageReducer from './containers/ItemPage/editItemPageSlice';
import ReduxLogger from "redux-logger";

const rootReducer = combineReducers({
  itemsSection: itemsSectionReducer,
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