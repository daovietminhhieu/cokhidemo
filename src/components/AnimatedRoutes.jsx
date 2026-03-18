import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

import Home from "../pages/Home";
const Shop = lazy(() => import("../pages/Shop"));
const Contact = lazy(() => import("../pages/Contact"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Admin = lazy(() => import("../pages/admin/Admin"));
const AdminContacts = lazy(() => import("../pages/admin/AdminContacts"));
const AdminProfile = lazy(() => import("../pages/admin/AdminProfile"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const NewsDetail = lazy(() => import("../pages/NewsDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const ImageLoaderDemo = lazy(() => import("./ImageLoaderDemo"));

import PageTransition from "./PageTransition";



export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          {/* ... existing routes ... */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/shop/:productId" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
          <Route path="/admin/contacts" element={<PageTransition><AdminContacts /></PageTransition>} />
          <Route path="/admin/profile" element={<PageTransition><AdminProfile /></PageTransition>} />
          <Route path="/news/:articleId" element={<PageTransition><NewsDetail /></PageTransition>} />
          <Route path="/image-loader-demo" element={<PageTransition><ImageLoaderDemo /></PageTransition>} />
          <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
