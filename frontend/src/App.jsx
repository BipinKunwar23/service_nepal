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
import BookingSummary from "./user/customer/Booking/Summary";

import ViewServices from "./user/provider/services/viewServices";
import ViewProvider from "./user/customer/home/ViewProvider";

import RequireAuth from "./RequireAuth";
import RequireCustomerAuth from "./RequireCustomerAuth";
import RequireProviderAuth from "./RequireProviderAuth";
import JoinService from "./user/provider/setup/JoinService";
import Getstarted from "./user/provider/setup/getstarted";
import ViewService from "./user/customer/home/ViewService";

import OrderSummary from "./user/provider/order/Summary";
import ViewAgreement from "./user/provider/order/agreement/ViewAgreement";
import MakeOrder from "./user/customer/order/makeOrder";
import DashboardHome from "./user/customer/Dashbaord/dashboardHome";
import BookingDetails from "./user/customer/Booking/BookingDetails";
import CheckAgreement from "./user/customer/Booking/quotation/checkAgreement";
import AddStatus from "./user/provider/order/progress/AddStatus";
import ViewStatus from "./user/provider/order/progress/ViewStatus";
import OrderDetail from "./user/provider/order/ViewDetails";
import StatusDetail from "./user/provider/order/progress/StatusDetail";
import UpdateStatus from "./user/provider/order/progress/UpdateStatus";
import ViewProgress from "./user/customer/Booking/progress/ViewStatus";
import ViewCategory from "./user/provider/home/viewCategory";

function App() {
  const selected = useSelector((state) => state.categorySlice.category);

  return (
    <section className=" mx-auto shadow-xl shadow-current rounded-t-xl  border border-gray-400 w-[90Vw] min-h-screen ">
      <Navbar />
      <section className="-z-0 ">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/customer" element={<Home />}></Route>
          <Route
            path="/provider/:providerId/category/:categoryId"
            element={<ViewProvider />}
          >
           
            <Route
              path="service/:serviceId/*"
              element={<ViewService />}
            ></Route>
          </Route>
          <Route
              path="/provider/:providerId/category/:categoryId/order"
              element={<MakeOrder />}
            />

          {/* <Route
          path="/order/service/:serviceId"
          element={
            <RequireCustomerAuth>
              <Order />
            </RequireCustomerAuth>
          }
        /> */}

          <Route path="dashboard/customer" element={<DashboardHome />} />
          <Route path="booking/customer" element={<BookingSummary />}>
            <Route path="order/:orderId" element={<BookingDetails />}>
              <Route path="status" element={<ViewProgress />} />
            </Route>
            <Route path="agreement/:orderId" element={<CheckAgreement />} />
          </Route>

          <Route path="/join" element={<JoinService />} />
          <Route path="/notify" element={<Getstarted />} />

          {/* <Route path="/orders/customer" element={<Order />} /> */}
          {/* <Route path="/status" element={<Status />} /> */}

          <Route path="/user/*">
            <Route path="profile/" element={<Profile />} />
            <Route path="profile/create" element={<Edit />} />

            <Route path="category/" element={<CategoryPage />}>
              <Route path=":name/:subname" element={<EditCategory />} />
              <Route path=":name/:subname/:child" element={<EditCategory />} />
            </Route>
          </Route>

          <Route path="received/orders/*" element={<OrderSummary />}>
            <Route path=":orderId" element={<OrderDetail />}>
              <Route path="progress/*" element={<ViewStatus />}>
                <Route path=":progressId/more" element={<StatusDetail />} />
                <Route path="create" element={<AddStatus />} />
                <Route path=":progressId/update" element={<UpdateStatus />} />
              </Route>
            </Route>
            <Route path="agreement/:orderId" element={<ViewAgreement />} />
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
            path="/provider/category/:categoryId"
            element={<ViewCategory />}
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

          {/* <Route
          path="/provider/services/:serviceId"
          element={<ViewServices />}
        /> */}
        </Routes>

        <Footer />
      </section>
    </section>
  );
}

export default App;
