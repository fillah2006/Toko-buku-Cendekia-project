import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// ==============================
// LAZY LOADING PAGES
// ==============================

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

// COMPONENT UI PAGE
const Components = React.lazy(() =>
    import("./pages/Components")
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

export default function App() {

    return (
        <Suspense fallback={<Loading />}>

            <Routes>

                {/* ========================= */}
                {/* MAIN LAYOUT */}
                {/* ========================= */}
                <Route element={<MainLayout />}>

                    {/* DASHBOARD */}
                    <Route
                        path="/"
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

                    {/* COMPONENT UI */}
                    <Route
                        path="/components"
                        element={<Components />}
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