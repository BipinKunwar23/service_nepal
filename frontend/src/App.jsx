// import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./landingPage/landing";
import SignUp from "./authentication/SignUP";
import SignIn from "./authentication/SignIn";
import Home from "./user/customer/home/Home";
import Provider from "./user/customer/home/Provider";
import { CategoryPage } from "./category/categoryPage";
import Profile from "./profile/Profile";
import Edit from "./profile/edit";
import EditCategory from "./category/EditCategory";
import ServiceSetUp from "./user/provider/setup/home";

import { useSelector } from "react-redux";
import ProviderHome from "./user/provider/home/home";
import Services from "./user/provider/services/service";

import Order from "./user/customer/order/order";
import OrderHistory from "./user/customer/order/orderHistory";

import ViewServices from "./user/provider/services/viewServices";
import ViewProvider from "./user/customer/home/ViewProvider";

import RequireAuth from "./RequireAuth";
import RequireCustomerAuth from "./RequireCustomerAuth";
import RequireProviderAuth from "./RequireProviderAuth";
import JoinService from "./user/provider/setup/JoinService";
import Getstarted from "./user/provider/setup/getstarted";
import Status from "./user/provider/order/status";
function App() {
  const selected = useSelector((state) => state.categorySlice.category);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/customer" element={<Home />}></Route>
        <Route path="/provider/:providerId" element={<ViewProvider />} />
        <Route
          path="/order/service/:serviceId"
          element={
            <RequireCustomerAuth>
              <Order />
            </RequireCustomerAuth>
          }
        />
      <Route path="/join" element={<JoinService/>}/>
      <Route path="/notify" element={<Getstarted/>}/>

        <Route path="/orders/customer" element={<Order />} />
        <Route path="/status" element={<Status />} />

        <Route path="/user/*">
          <Route path="profile/" element={<Profile />} />
          <Route path="profile/create" element={<Edit />} />

          <Route path="category/" element={<CategoryPage />}>
            <Route path=":name/:subname" element={<EditCategory />} />
            <Route path=":name/:subname/:child" element={<EditCategory />} />
          </Route>
        </Route>
        <Route
          path="provider"
          element={
            <RequireAuth>
              <ProviderHome />
            </RequireAuth>
          }
        />

        <Route
          path="/provider/service/join/:serviceId"
          element={
            <RequireProviderAuth>
              <ServiceSetUp />
            </RequireProviderAuth>
          }
        />
        <Route path="services/provider" element={<Services />} />

        <Route
          path="/provider/services/:serviceId"
          element={<ViewServices />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
