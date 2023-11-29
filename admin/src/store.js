import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { subCategoryApi } from "./Api/subCategoryApi";
import { categoryApi } from "./Api/categoryApi";
import { serviceApi } from "./Api/serviceApi";
import categorySliceReducer from './redux/categorySlice'
import catServiceSliceReducer from "./redux/catServiceSlice";
import { catServiceAPi } from "./Api/catServiceApi";
import { providerApi } from "./Api/providerApi";
import serviceSliceReducer from "./redux/serviceSlice";
const middleware = getDefaultMiddleware({
  serializableCheck:{
    ignoreActions:['profile/basicDetails'],
    ignoredPaths: ['profile.basic.profile'],
  }
}).concat(
  categoryApi.middleware,  
  serviceApi.middleware,
  catServiceAPi.middleware,
  subCategoryApi.middleware,
  providerApi.middleware
);
export const store = configureStore({
  reducer: {
   
    [categoryApi.reducerPath]:categoryApi.reducer,
    [serviceApi.reducerPath]:serviceApi.reducer,
    [catServiceAPi.reducerPath]:catServiceAPi.reducer,
    [subCategoryApi.reducerPath]:subCategoryApi.reducer,
    [providerApi.reducerPath]:providerApi.reducer,
    categorySlice:categorySliceReducer,
    catServiceSlice:catServiceSliceReducer,
    serviceSlice:serviceSliceReducer,
  },

  middleware
 
});
