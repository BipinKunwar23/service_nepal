import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/admin/sidebar'
import AdminHome from './../views/admin/home/adminHome';
import Category from '../views/admin/catalog/category/category'
import { AddCategory } from '../views/admin/catalog/category/AddCategory';
import SubCategory from '../views/admin/catalog/subcategory/subCategory';
import Service from '../views/admin/catalog/service/service';
import ServiceOption from './../views/admin/catalog/options/option';
import ServiceStandards from './../views/admin/catalog/standards/standard';
import StandardValue from './../views/admin/catalog/standards/values/value';
import Dashboard from './../views/admin/dashbaord/Dashboard';
import ServiceForm from './../components/admin/ServiceForm';
const AdminRoute = () => {
  return (
    <section className="flex gap-4">
    {/* {!isAdmin && <Admin />}
    {isAdmin && ( */}
    <Sidebar />
    <section className="flex-1 ">
      <Routes>
        <Route path="category" element={<Category />} />
        <Route path="category/new" element={<AddCategory />} />
        <Route path="category/:categoryId" element={<SubCategory />}>
          <Route
            path="subcategory/:subcategoryId"
            element={<Service />}
          />
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
          path="category/:categoryId/subcategory/:subcategoryId/service/:serviceId/option/:optionId/standard/:standardId"
          element={<StandardValue />}
        />

        {/* 
        <Route path="subcategory" element={<SubCategory />} />
        <Route path="services" element={<Service />} />
        <Route path="services/new" element={<AddService />} /> */}

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="service/create" element={<ServiceForm />} />
      </Routes>
    </section>
    {/* )} */}
  </section>
  )
}

export default AdminRoute