import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
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
import BestSellingManagement from "./DashboardComponents/bestSelling";
import Orders from "./DashboardComponents/orders";
import Users from "./DashboardComponents/users";
import Settings from "./DashboardComponents/settings";
// import Project from "./components/project";
// ViewTableData is now a modal component, no longer a page route
import ProductTable from "./components/ProductTable"
import BlogPage from "./components/blog"
// Cart is now a sidebar component imported in Home.tsx
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
        <WishlistProvider>
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
              {/* Product view is now a modal popup, no longer a separate page */}
              <Route path="/products" element={<ProductTable />} /> 
              <Route path="/blog" element={<BlogPage />} />
              {/* Cart is now a sidebar popup, no longer a separate page */}
            </Route>

            {/* Admin-only layout */}
            <Route element={<AdminRoute><Layout2 /></AdminRoute>}> 
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addproducts" element={<ProductManager />} />
              <Route path="/bestselling" element={<BestSellingManagement />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/shope" element={<Shope />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeContext.Provider>
      </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
