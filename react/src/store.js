import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { subCategoryApi } from "./api/admin/subCategoryApi";
import { categoryApi } from "./api/admin/categoryApi";
import { catServiceAPi } from "./api/admin/catServiceApi";
import { providerApi } from "./api/admin/providerApi";
import { optionApi } from "./api/admin/optionApi";
import { userApi } from "./api/admin/userApi";
import { aboutApi } from "./api/admin/aboutApi";
import { standardApi } from "./api/admin/standardApi.js";


import { authApi } from "./api/authApi";
import { landingApi } from "./api/public/landingApi";
import { chatApi } from "./api/chatApi";
import { profileApi } from "./api/profileApi";
import { notificationApi } from "./api/notificationApi";
import { searchHistoryApi } from "./api/searchHistoryApi";
import { userServiceApi } from "./api/public/serviceApi.js";


import { buyerCatalogApi } from "./api/buyer/catalogApi";
import { buyerServiceApi } from "./api/buyer/serviceApi.js";
import { buyerOrderApi } from "./api/buyer/orderApi";
import { buyerFilterApi } from "./api/buyer/filterApi";
import { buyerProgressApi } from "./api/buyer/progressApi";
import { buyerFeedbackApi } from "./api/buyer/feedbackApi";

import { sellerCatalogApi } from "./api/seller/catalogApi";
import { sellerServiceApi } from "./api/seller/serviceApi";
import { sellerProfileApi } from "./api/seller/profileApi";
import { sellerFeedbackApi } from "./api/seller/feedbackApi";
import { sellerOrderApi } from "./api/seller/orderApi";
import { savedApi } from "./api/buyer/savedApi.js";
import { statusApi } from "./api/seller/statusApi.js";

import buyerSliceReducer from "./redux/buyerSlice";
import sellerSliceReducer from "./redux/sellerSlice";

const middleware = getDefaultMiddleware().concat(
  categoryApi.middleware,  
  userApi.middleware,
  catServiceAPi.middleware,
  subCategoryApi.middleware,
  providerApi.middleware,
  optionApi.middleware,
  aboutApi.middleware,
  landingApi.middleware,
  savedApi.middleware,
  statusApi.middleware,
  standardApi.middleware,




  authApi.middleware,
  profileApi.middleware,
  chatApi.middleware,
  notificationApi.middleware,
  searchHistoryApi.middleware,
  userServiceApi.middleware,

  buyerCatalogApi.middleware,
  buyerServiceApi.middleware,
  buyerOrderApi.middleware,
  buyerFeedbackApi.middleware,
  buyerProgressApi.middleware,
  buyerFilterApi.middleware,

  sellerCatalogApi.middleware,
  sellerServiceApi.middleware,
  sellerProfileApi.middleware,
  sellerFeedbackApi.middleware,
  sellerOrderApi.middleware,
);
export const store = configureStore({
  reducer: {

    [categoryApi.reducerPath]:categoryApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [catServiceAPi.reducerPath]:catServiceAPi.reducer,
    [subCategoryApi.reducerPath]:subCategoryApi.reducer,
    [providerApi.reducerPath]:providerApi.reducer,
    [optionApi.reducerPath]:optionApi.reducer,
    [aboutApi.reducerPath]:aboutApi.reducer,
    [landingApi.reducerPath]:landingApi.reducer,
    [standardApi.reducerPath]:standardApi.reducer,




    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [searchHistoryApi.reducerPath]: searchHistoryApi.reducer,
    [statusApi.reducerPath]: statusApi.reducer,
    [userServiceApi.reducerPath]: userServiceApi.reducer,




    [buyerCatalogApi.reducerPath]: buyerCatalogApi.reducer,
    [buyerServiceApi.reducerPath]: buyerServiceApi.reducer,
    [buyerProgressApi.reducerPath]: buyerProgressApi.reducer,
    [buyerOrderApi.reducerPath]: buyerOrderApi.reducer,
    [buyerFeedbackApi.reducerPath]: buyerFeedbackApi.reducer,
    [savedApi.reducerPath]: savedApi.reducer,


    [buyerFilterApi.reducerPath]: buyerFilterApi.reducer,
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
