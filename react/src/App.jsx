// import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import RequireAuth from "./components/requireAuth/RequireAuth";

import LandingPage from "./components/landingPage/landingPage";
import SellerHome from "./views/seller/home/sellerHome";
import BuyerHome from "./views/buyer/home/buyerHome";
import SellerDashboard from "./views/seller/dashboard/sellerDashboard";

import SubCategory from "./components/catalog/subcategory";
import ServiceFilter from "./views/buyer/filtration/serviceFilter";

import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import Profile from "./components/profile/profile";

import ServiceGuideline from "./views/seller/serviceManagement/porfileCreation/guideline";
import ServiceProfile from "./views/seller/serviceManagement/porfileCreation/serviceProfile";
import CreateService from "./views/seller/serviceManagement/serviceCreation/ceeateService";
import ServiceDetail from "./views/seller/serviceManagement/serviceInformation/serviceDetail";
import BuyerService from "./views/buyer/service/buyerService";

import OrderConfirm from "./views/buyer/order/orderConfirm";
import BuyerOrderList from "./views/buyer/order/summary";
import BuyerOrderDetail from "./views/buyer/order/orderDetails";
import SellerOrderOverview from "./views/seller/order/overview";
import { Chat } from "./components/chat/chat";
import CreateReview from "./views/buyer/review/createReview";
import AddStatus from "./views/seller/progress/AddStatus";
import ViewStatus from "./views/seller/progress/ViewStatus";
import OrderDetail from "./views/seller/order/ViewDetails";
import StatusDetail from "./components/statusDetail";
import UpdateStatus from "./views/seller/progress/UpdateStatus";
import SearchResult from "./components/search/searchResult";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import ViewChat from "./components/chat/viewChat";
import Notification from "./components/notification/notification";
import ServiceSummary from "./views/seller/serviceManagement/serviceInformation/summary";
import { setSenderMessage } from "./redux/sellerSlice";
import { setNotifications, setCounts } from "./redux/sellerSlice";
import UserHome from "./views/user/home/userHome";
import SellerPage from "./views/seller/home/seller";
import BuyerNavbar from "./views/buyer/home/buyer-navbar";
import RequireRole from "./views/seller/serviceManagement/serviceCreation/requireRole";
import DraftService from "./views/seller/serviceManagement/serviceCreation/draftService";
import NewService from "./views/seller/serviceManagement/serviceCreation/newService";
import SellerServiceDetail from "./views/seller/serviceManagement/serviceInformation/serviceDetail";
import AdminRoute from "./route/admin";
import SellerNavbar from "./components/navbar/seller-navbar";

function App() {
  const message = useSelector((state) => state.sellerSlice.toastMessage);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   setName( localStorage.getItem("name"))

  // },[localStorage.getItem("role")])
  const senderId = parseInt(localStorage.getItem("userId"));
  const receiverId = parseInt(localStorage.getItem("userId"));

  const senderMessage = useSelector((state) => state.sellerSlice.senderMessage);
  const notifications = useSelector((state) => state.sellerSlice.notifications);
  const name =
    useSelector((state) => state.sellerSlice.name) ||
    localStorage.getItem("name");

  const count = useSelector((state) => state.sellerSlice.count);

  window.Echo.private(`private-chat`).listen("privateChat", (event) => {
    console.log("event", event);
    if (event?.message?.receiver_id === senderId) {
      dispatch(setSenderMessage([...senderMessage, event?.message]));
      dispatch(setCounts({ ...count, message: count.message + 1 }));
    }
  });

  window.Echo.private(`private-notification`).listen(
    "notification",
    (event) => {
      console.log("event", event);
      if (event?.notification?.receiver_id === receiverId) {
        dispatch(setNotifications([...notifications, event?.notification]));
        dispatch(setCounts({ ...count, notification: count.notification + 1 }));
      }
    }
  );

  const seller = `user/${name}/seller`;

  const role = localStorage.getItem("role");

  return (
    <section className="relative">
      {/* <ToastContainer /> */}
      {/* <Navbar /> */}

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage>
              <BuyerHome />
            </LandingPage>
          }
        />
        <Route path="/admin/*" element={<AdminRoute/>}/>
        <Route path="user/signin" element={<SignIn />}></Route>
        <Route path="user/signup" element={<SignUp />}></Route>

        <Route path="user" element={<UserHome />}>
          <Route
            path="category/:categoryId/subcategory/:subcategoryId/service/:serviceId"
            element={<ServiceFilter />}
          />

          <Route
            path="service/:serviceId/option/:optionId"
            element={<BuyerService />}
          />

          <Route path="category/:categoryId" element={<SubCategory />} />
        </Route>
        <Route path="user/search" element={<SearchResult />} />

        <Route path={`user/${name}`} element={<BuyerHome />}>
          <Route
            path="category/:categoryId/subcategory/:subcategoryId/service/:serviceId"
            element={<ServiceFilter />}
          />
          <Route path="result/service/search" element={<SearchResult />} />

          <Route
            path="service/:serviceId/option/:optionId"
            element={<BuyerService />}
          />

          <Route path="category/:categoryId" element={<SubCategory />} />
          <Route
            path="service/:serviceId/option/:optionId/order"
            element={<OrderConfirm />}
          ></Route>
          <Route path={`orders`} element={<BuyerOrderList />}>
            <Route path=":orderId" element={<BuyerOrderDetail />} />
          </Route>
          <Route path={`chat/receiver`} element={<ViewChat />}></Route>
          <Route path="service/:serviceId" element={<ServiceDetail />} />

          <Route path={`notifications`} element={<Notification />}></Route>
          <Route
            path={`/user/${name}/chat/receiver/:receiverId`}
            element={<Chat />}
          ></Route>

          <Route
            path="service/:serviceId/review"
            element={<CreateReview />}
          ></Route>
        </Route>

        <Route path={`user/${name}/profile`} element={<Profile />} />

        <Route path={`${seller}`} element={<SellerPage />} />
        <Route
          path={`${seller}/profile`}
          element={
            <RequireAuth>
              <ServiceProfile />
            </RequireAuth>
          }
        />

        <Route
          path={`${seller}/service/new`}
          element={
            <RequireRole>
              <NewService />
            </RequireRole>
          }
        />
        <Route
          path={`${seller}/service/:action/:serviceId`}
          element={
            <RequireRole>
              <DraftService />
            </RequireRole>
          }
        />

        <Route
          path={`${seller}/service/:serviceId/option/:optionId`}
          element={<SellerServiceDetail />}
        />

        <Route path={`${seller}/*`} element={<SellerHome />}>
          <Route path="dashboard" element={<SellerDashboard />} />

          <Route path="orders" element={<SellerOrderOverview />} />
          <Route path="services" element={<ServiceSummary />} />
        </Route>
        <Route path={`${seller}/guideline`} element={<ServiceGuideline />} />
      </Routes>

      <Footer />
    </section>
  );
}

export default App;
