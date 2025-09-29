import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AdminRoute from "./components/AdminRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Footerdown from "./components/Footerdown";
import Layout from "./layout/Layout";
import Layout2 from "./DashboardComponents/dashboardlayout";
import Dashboard from "./DashboardComponents/Dashboard";
import ProductManager from "./DashboardComponents/addproduct";
import Orders from "./DashboardComponents/orders";
import Users from "./DashboardComponents/users";
import Settings from "./DashboardComponents/settings";
// import Project from "./components/project";
import ViewTableData from "./components/viewTableData"; // ✅ Added this line
import ProductTable from "./components/ProductTable"
import BlogPage from "./components/blog"
import CartPage from "./components/CartPage"
import Shope from "./DashboardComponents/shope"


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <CartProvider>
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <BrowserRouter>
            <Routes>
            {/* Public layout */}
            <Route element={<Layout />}> 
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/footerdown" element={<Footerdown />} />
              {/* <Route path="/project" element={<Project />} /> */}
              <Route path="/singleView/:id" element={<ViewTableData />} />
              <Route path="/products" element={<ProductTable />} /> 
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/cart" element={<CartPage />} /> 
            </Route>

            {/* Admin-only layout */}
            <Route element={<AdminRoute><Layout2 /></AdminRoute>}> 
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addproducts" element={<ProductManager />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/shope" element={<Shope />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeContext.Provider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
