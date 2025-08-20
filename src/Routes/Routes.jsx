import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import EditBiodata from "../pages/Dashboard/User/EditBiodata";
import ViewBiodata from "../pages/Dashboard/User/ViewBiodata";
import AllBiodatas from "../pages/Biodatas/AllBiodatas";
import BiodataDetails from "../pages/Biodatas/BiodataDetails";
import FavoritesBiodata from "../pages/Dashboard/User/FavoritesBiodata";
import Checkout from "../pages/Dashboard/Payment/Checkout";
import MyContactRequest from "../pages/Dashboard/User/MyContactRequest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from "../pages/Dashboard/Admin/ApprovedPremium";
import ApproveContactRequest from "../pages/Dashboard/Admin/ApproveContactRequest";
import Dashboard from "../pages/Dashboard/Dashboard";
import GotMarried from "../pages/Dashboard/User/GotMarried";
import AdminSuccessStory from "../pages/Dashboard/Admin/AdminSuccessStory";
import Forbidden from "../components/Forbidden";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../components/ErrorPage";
import AboutUs from "../pages/About/AboutUs";
import Contact from "../pages/Contact/Contact";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "forbidden",
        element: <Forbidden></Forbidden>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "/biodatas",
        element: <AllBiodatas></AllBiodatas>,
      },
      {
        path: "/biodata-details/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails></BiodataDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "home",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "approved-premium",
        element: (
          <AdminRoute>
            <ApprovedPremium></ApprovedPremium>
          </AdminRoute>
        ),
      },
      {
        path: "approved-contact-request",
        element: (
          <AdminRoute>
            <ApproveContactRequest></ApproveContactRequest>
          </AdminRoute>
        ),
      },
      {
        path: "success-story",
        element: (
          <AdminRoute>
            <AdminSuccessStory></AdminSuccessStory>
          </AdminRoute>
        ),
      },
      // user routes
      {
        path: "edit-biodata",
        element: <EditBiodata></EditBiodata>,
      },
      {
        path: "view-biodata",
        element: <ViewBiodata></ViewBiodata>,
      },
      {
        path: "my-contact-requests",
        element: <MyContactRequest></MyContactRequest>,
      },
      {
        path: "favourites",
        element: <FavoritesBiodata></FavoritesBiodata>,
      },
      {
        path: "got-married",
        element: <GotMarried></GotMarried>,
      },
      
    ],
  },
]);
