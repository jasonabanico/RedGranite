import {
  configureStore,
  ThunkAction,
  Action
} from "@reduxjs/toolkit";
import homePageReducer from "./containers/HomePage/homePageSlice";
import itemPageReducer from "./containers/ItemPage/itemPageSlice";
import ReduxLogger from "redux-logger";

export const store = configureStore({
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxLogger),
  reducer: {
    homePage: homePageReducer,
    itemPage: itemPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;