import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { subCategoryApi } from "./api/admin/subCategoryApi";
import { categoryApi } from "./api/admin/categoryApi";
import { serviceApi } from "./api/admin/serviceApi"

import { catServiceAPi } from "./api/admin/catServiceApi";
import { providerApi } from "./api/admin/providerApi";
import { optionApi } from "./api/admin/optionApi";


import { authApi } from "./api/authApi";
import { chatApi } from "./api/chatApi";
import { profileApi } from "./api/profileApi";
import { notificationApi } from "./api/notificationApi";
import { searchHistoryApi } from "./api/searchHistoryApi";

import { buyerCatalogApi } from "./api/buyer/catalogApi";
import { buyerServiceApi } from "./api/buyer/serviceApi";
import { buyerOrderApi } from "./api/buyer/orderApi";
import { filterApi } from "./api/buyer/filterApi";
import { buyerProgressApi } from "./api/buyer/progressApi";
import { buyerFeedbackApi } from "./api/buyer/feedbackApi";

import { sellerCatalogApi } from "./api/seller/catalogApi";
import { sellerServiceApi } from "./api/seller/serviceApi";
import { sellerProfileApi } from "./api/seller/profileApi";
import { sellerFeedbackApi } from "./api/seller/feedbackApi";
import { sellerOrderApi } from "./api/seller/orderApi";

import buyerSliceReducer from "./redux/buyerSlice";
import sellerSliceReducer from "./redux/sellerSlice";

const middleware = getDefaultMiddleware().concat(
  categoryApi.middleware,  
  serviceApi.middleware,
  catServiceAPi.middleware,
  subCategoryApi.middleware,
  providerApi.middleware,
  optionApi.middleware,

  authApi.middleware,
  profileApi.middleware,
  chatApi.middleware,
  notificationApi.middleware,
  searchHistoryApi.middleware,

  buyerCatalogApi.middleware,
  buyerServiceApi.middleware,
  buyerOrderApi.middleware,
  buyerFeedbackApi.middleware,
  buyerProgressApi.middleware,
  filterApi.middleware,

  sellerCatalogApi.middleware,
  sellerServiceApi.middleware,
  sellerProfileApi.middleware,
  sellerFeedbackApi.middleware,
  sellerOrderApi.middleware,
);
export const store = configureStore({
  reducer: {

    [categoryApi.reducerPath]:categoryApi.reducer,
    [serviceApi.reducerPath]:serviceApi.reducer,
    [catServiceAPi.reducerPath]:catServiceAPi.reducer,
    [subCategoryApi.reducerPath]:subCategoryApi.reducer,
    [providerApi.reducerPath]:providerApi.reducer,
    [optionApi.reducerPath]:optionApi.reducer,

    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [searchHistoryApi.reducerPath]: searchHistoryApi.reducer,


    [buyerCatalogApi.reducerPath]: buyerCatalogApi.reducer,
    [buyerServiceApi.reducerPath]: buyerServiceApi.reducer,
    [buyerProgressApi.reducerPath]: buyerProgressApi.reducer,
    [buyerOrderApi.reducerPath]: buyerOrderApi.reducer,
    [buyerFeedbackApi.reducerPath]: buyerFeedbackApi.reducer,

    [filterApi.reducerPath]: filterApi.reducer,
    [sellerCatalogApi.reducerPath]: sellerCatalogApi.reducer,
    [sellerServiceApi.reducerPath]: sellerServiceApi.reducer,
    [sellerProfileApi.reducerPath]: sellerProfileApi.reducer,
    [sellerFeedbackApi.reducerPath]: sellerFeedbackApi.reducer,
    [sellerOrderApi.reducerPath]: sellerOrderApi.reducer,


    buyerSlice: buyerSliceReducer,
    sellerSlice: sellerSliceReducer,
  },

  middleware,
});
