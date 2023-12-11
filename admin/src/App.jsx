import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Naavbar from "./Navbar";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { CategoryPage } from "./category/categoryPage";
import Dashboard from "./Dashboard";
import Admin from "./admin";
import Home from "./Home";
import ServiceForm from "./category/ServiceForm";
import { useSelector } from 'react-redux';
function App() {
  const isAdmin = useSelector((state)=>state.categorySlice.isAdmin)
  const [count, setCount] = useState(0);

  return (
    <>
      {/* {!isAdmin && <Admin />}
      {isAdmin && ( */}
        <>
          <Naavbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/category" element={<CategoryPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service/create" element={<ServiceForm/>}/>
          </Routes>
        </>
      {/* )} */}
    </>
  );
}

export default App;
