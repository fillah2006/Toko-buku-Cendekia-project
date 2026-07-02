import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Loading } from "./components";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// ==============================
// LAZY LOADING PAGES
// ==============================

const Landing = React.lazy(() =>
    import("./pages/Landing")
);

const Dashboard = React.lazy(() =>
    import("./pages/Dashboard")
);

const Customers = React.lazy(() =>
    import("./pages/Customers")
);

const Products = React.lazy(() =>
    import("./pages/Products")
);

const ProductDetail = React.lazy(() =>
    import("./pages/ProductDetail")
);

const Transactions = React.lazy(() =>
    import("./pages/Transactions")
);

const AddCustomer = React.lazy(() =>
    import("./pages/AddCustomer")
);

// AUTH PAGES
const Login = React.lazy(() =>
    import("./pages/auth/Login")
);

const Register = React.lazy(() =>
    import("./pages/auth/Register")
);

const Forgot = React.lazy(() =>
    import("./pages/auth/Forgot")
);

const Users = React.lazy(() =>
    import("./pages/Users")
);

export default function App() {

    return (
        <Suspense fallback={<Loading />}>

            <Routes>
                <Route path="/" element={<Landing />} />

                {/* ========================= */}
                {/* MAIN LAYOUT */}
                {/* ========================= */}
                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    {/* DASHBOARD */}
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    {/* CUSTOMERS */}
                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    {/* ADD CUSTOMER */}
                    <Route
                        path="/customers/add"
                        element={<AddCustomer />}
                    />

                    {/* PRODUCTS */}
                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    {/* PRODUCT DETAIL */}
                    <Route
                        path="/products/:id"
                        element={<ProductDetail />}
                    />

                    {/* TRANSACTIONS */}
                    <Route
                        path="/transactions"
                        element={<Transactions />}
                    />

                    {/* USERS */}
                    <Route
                        path="/users"
                        element={<Users />}
                    />

                </Route>

                {/* ========================= */}
                {/* AUTH LAYOUT */}
                {/* ========================= */}
                <Route element={<AuthLayout />}>

                    {/* LOGIN */}
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    {/* REGISTER */}
                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    {/* FORGOT PASSWORD */}
                    <Route
                        path="/forgot"
                        element={<Forgot />}
                    />

                </Route>

            </Routes>

        </Suspense>
    );
}