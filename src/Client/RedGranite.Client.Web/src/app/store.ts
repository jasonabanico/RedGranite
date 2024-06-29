import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers
} from "@reduxjs/toolkit";
import homePageReducer from "./containers/HomePage/homePageSlice";
import saveNewItemReducer from "./containers/ItemPage/saveNewItemSlice";
import ReduxLogger from "redux-logger";

const rootReducer = combineReducers({
  homePage: homePageReducer,
  itemPageSaveNewItem: saveNewItemReducer,
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