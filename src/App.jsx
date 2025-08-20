import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage";
import LoginPage from "../src/pages/Auth/Login";
import RegisterPage from "../src/pages/Auth/Register";
import GoogleLogin from "../src/pages/Auth/GoogleLogin";
import ProfilePage from "../src/pages/ProfilePage";
import MatchesPage from "../src/pages/Matchpage";
import ContactPage from "../src/pages/ContactPage";
import AboutUs from "../src/pages/AboutUs";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
 import AdminPanel from "../src/pages/Dashboard/Admin/AdminHome";
 import Dashboard from "../src/pages/Dashboard/Dashboard";
 import Plans from "./components/Plan";
 import PaymentPlans from "./pages/PaymentsPlans";
 import QuickRegisterButtons from "./components/QuickRegisterButtons";
 import  Search  from "./pages/Search"
 import PremimumMembership from "./components/PremimumMembership";
 import EditBiodata from "./pages/Dashboard/User/EditBiodata";
 import AllBiodatas from "./pages/Biodatas/AllBiodatas";
 import Forbidden from "./components/Forbidden";



 
 

function App() {
  return (
    <>
      <Header />
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/payment" element={<PaymentPlans />} />
        <Route path="/search" element={<Search />} />
         <Route path="/premimum" element={<PremimumMembership />} /> 
         <Route path="/profile/:id" element={<ProfilePage />} /> 
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/biodatas" element={<EditBiodata />} />
         <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
      {/* </BrowserRouter> */}
      <QuickRegisterButtons />
      <Footer />
    </>
  );
}

export default App;


 


