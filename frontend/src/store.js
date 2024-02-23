import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { chatApi } from "./Api/chatApi";
import { profileApi } from "./api/ProfileApi";

import { buyerCatalogApi } from "./api/buyer/catalogApi";
import { buyerServiceApi } from "./api/buyer/serviceApi";
import { buyerOrderApi } from "./api/buyer/orderApi";
import { filterApi } from "./api/buyer/filterApi";
import { buyerProgressApi } from "./api/buyer/progressApi";

import { sellerCatalogApi } from "./api/seller/catalogApi";
import { sellerServiceApi } from "./api/seller/serviceApi";
import { sellerProfileApi } from "./api/seller/profileApi";
import { sellerFeedbackApi } from "./api/seller/feedbackApi";

import buyerCardSliceReducer from "./redux/buyer/cardSlice";
import buyerServiceSliceReducer from "./redux/buyer/serviceSlice";
import sellerServiceSliceReducer from "./redux/seller/serviceSlice";

const middleware = getDefaultMiddleware().concat(
  authApi.middleware,
  profileApi.middleware,
  chatApi.middleware,
  buyerCatalogApi.middleware,
  buyerServiceApi.middleware,
  buyerOrderApi.middleware,
  buyerProgressApi.middleware,
  filterApi.middleware,
  sellerCatalogApi.middleware,
  sellerServiceApi.middleware,
  sellerProfileApi.middleware,
  sellerFeedbackApi.middleware
);
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [buyerCatalogApi.reducerPath]: buyerCatalogApi.reducer,
    [buyerServiceApi.reducerPath]: buyerServiceApi.reducer,
    [buyerProgressApi.reducerPath]: buyerProgressApi.reducer,
    [buyerOrderApi.reducerPath]: buyerOrderApi.reducer,
    [filterApi.reducerPath]: filterApi.reducer,
    [sellerCatalogApi.reducerPath]: sellerCatalogApi.reducer,
    [sellerServiceApi.reducerPath]: sellerServiceApi.reducer,
    [sellerProfileApi.reducerPath]: sellerProfileApi.reducer,
    [sellerFeedbackApi.reducerPath]: sellerFeedbackApi.reducer,

    buyerCardSlice: buyerCardSliceReducer,
    buyerServiceSlice: buyerServiceSliceReducer,
    sellerServiceSlice: sellerServiceSliceReducer,
  },

  middleware,
});
