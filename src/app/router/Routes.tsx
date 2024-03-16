import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/Home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import App from "../layout/App";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/Basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import OrderPage from "../../features/orders/OrderPage";
import Inventory from "../../features/admin/Inventory";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                // authenticated routes
                element: <RequireAuth />, children: [
                    { path: 'checkout', element: <CheckoutPage /> },
                    { path: 'orders', element: <OrderPage /> },

                ]
            },
            {
                // admin routes
                element: <RequireAuth roles={['Admin']} />, children: [
                    { path: '/inventory', element: <Inventory /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'basket', element: <BasketPage /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])