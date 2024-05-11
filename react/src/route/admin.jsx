import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Sidebar from "../components/admin/sidebar";
import AdminHome from "./../views/admin/home/adminHome";
import Category from "../views/admin/catalog/category/category";
import { AddCategory } from "../views/admin/catalog/category/AddCategory";
import SubCategory from "../views/admin/catalog/subcategory/subCategory";
import Service from "../views/admin/catalog/service/service";
import ServiceOption from "./../views/admin/catalog/options/option";
import ServiceStandards from "./../views/admin/catalog/standards/standard";
import StandardValue from "./../views/admin/catalog/standards/values/value";
import Dashboard from "./../views/admin/dashbaord/Dashboard";
import ServiceForm from "./../components/admin/ServiceForm";
import GetUers from "../views/admin/user/user";
import UserServices from "../views/admin/user/service";
import UserOrders from "../views/admin/user/order";
import ViewCompanyInfo from "../views/admin/about/company/view";
import ViewTeam from "../views/admin/about/team/view";
import ViewFaqs from "../views/admin/about/faqs/view";
import UserServiceDetail from "../views/admin/user/serviceDetail";
import EditSubCategory from "../views/admin/catalog/subcategory/ediSubCategory";
import AdminNavbar from "../views/admin/home/admin-navbar";
import AdminNotification from "../views/admin/notification/notification";
import SellerDashboard from "../views/seller/dashboard/sellerDashboard";
const AdminRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <section className=" flex gap-4  ">
      {/* {!isAdmin && <Admin />}
    {isAdmin && ( */}
      <div
        className=" 
    bg-gray-100 
      w-[270px] sticky top-0 grid place-items-start h-[100%]  "
      >
        <Sidebar />
      </div>
      <section className=" flex-1 overflow-y-auto  ">
        <AdminNavbar />
        <section className=" ">
          <Routes>
            <Route path="category" element={<Category />} />
            <Route path="category/new" element={<AddCategory />} />
            <Route path="category/:categoryId" element={<SubCategory />}>
              <Route
                path="subcategory/:subcategoryId/edit"
                element={<EditSubCategory />}
              />
              <Route path="subcategory/:subcategoryId" element={<Service />} />
            </Route>
            <Route
              path="category/:categoryId/subcategory/:subcategoryId/service/:serviceId"
              element={<ServiceOption />}
            />
            <Route
              path="category/:categoryId/subcategory/:subcategoryId/service/:serviceId/option/:optionId"
              element={<ServiceStandards />}
            />
            <Route
              path="category/:categoryId/subcategory/:subcategoryId/service/:serviceId/option/:optonId/standard/:standardId"
              element={<StandardValue />}
            />

            {/* 
        <Route path="subcategory" element={<SubCategory />} />
        <Route path="services" element={<Service />} />
        <Route path="services/new" element={<AddService />} /> */}

            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="service/create" element={<ServiceForm />} />
            <Route path="users" element={<GetUers />} />
            <Route path="services" element={<UserServices />} />
            <Route path="services/:serviceId" element={<UserServiceDetail />} />

            <Route path="orders" element={<UserOrders />} />
            <Route path="about/company" element={<ViewCompanyInfo />} />
            <Route path="about/team" element={<ViewTeam />} />
            <Route path="about/faq" element={<ViewFaqs />} />
            <Route path="about/legal" element={<ViewCompanyInfo />} />

            <Route path="notification" element={<AdminNotification />} />
          </Routes>
        </section>
      </section>
      {/* )} */}
    </section>
  );
};

export default AdminRoute;
