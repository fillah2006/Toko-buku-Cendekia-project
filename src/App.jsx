import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Lazy loading semua halaman
const Dashboard    = React.lazy(() => import("./pages/Dashboard"));
const Customers    = React.lazy(() => import("./pages/Customers"));
const Products     = React.lazy(() => import("./pages/Products"));
const Transactions = React.lazy(() => import("./pages/Transactions"));
const AddCustomer  = React.lazy(() => import("./pages/AddCustomer"));

const Login    = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot   = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Main Layout Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/"             element={<Dashboard />} />
                    <Route path="/customers"    element={<Customers />} />
                    <Route path="/products"     element={<Products />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/customers/add" element={<AddCustomer />} />
                </Route>

                {/* Auth Layout Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login"    element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot"   element={<Forgot />} />
                </Route>
            </Routes>
        </Suspense>
    );
}