import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Login from "../pages/Login";
import Admin from "../pages/admin/Admin";
import AdminContacts from "../pages/admin/AdminContacts";
import AdminProfile from "../pages/admin/AdminProfile";
import ProductDetail from "../pages/ProductDetail";
import NewsDetail from "../pages/NewsDetail";
import Cart from "../pages/Cart";
import PageTransition from "./PageTransition";
import ImageLoaderDemo from "./ImageLoaderDemo";



export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/shop"
          element={
            <PageTransition>
              <Shop />
            </PageTransition>
          }
        />
        <Route
          path="/shop/:productId"
          element={
            <PageTransition>
              <ProductDetail />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <Admin />
            </PageTransition>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <PageTransition>
              <AdminContacts />
            </PageTransition>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PageTransition>
              <AdminProfile />
            </PageTransition>
          }
        />
        <Route
          path="/news/:articleId"
          element={
            <PageTransition>
              <NewsDetail />
            </PageTransition>
          }
        />
        <Route
          path="/image-loader-demo"
          element={
            <PageTransition>
              <ImageLoaderDemo />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          }
        />

        {/* <Route
          path="/dashboard"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        
        /> */}
      </Routes>
    </AnimatePresence>
  );
}
