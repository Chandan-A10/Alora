import {Cart} from "../components/CartPage";
import { AdminDashboard } from "../pages/Admin/Dashboard";
import { LoginPage } from "../pages/Auth/LoginPage";
import { SignUpPage } from "../pages/Auth/SignUpPage";
import ProductsPage from "../pages/ProductsPage";
import { VendorDashBoard } from "../pages/Vendor/Dashboard";
import { Dashboard } from "../pages/user/Dashboard";

const { PageNotFound } = require("../pages/404");
const { AboutPage } = require("../pages/AboutPage");
const { ContactPage } = require("../pages/ContactPage");
const { HomePage } = require("../pages/HomePage");

export const publicRoutes=[
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/about',
        element:<AboutPage/>
    },
    {
        path:'/contact',
        element:<ContactPage/>
    },
    {
        path:'*',
        element:<PageNotFound/>
    },
    {
        path:'/signup',
        element:<SignUpPage/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    }
    ,{
        path:'/cart',
        element:<Cart/>
    },
    {
        path:'/products',
        element:<ProductsPage/>
    }
]

export const privateRoute=[
    {
        path:'/dashboard/0',
        element:<Dashboard/>
    },
    {
        path:'/dashboard/1',
        element:<AdminDashboard/>
    },
    {
        path:'/dashboard/2',
        element:<VendorDashBoard/>
    },
    
]