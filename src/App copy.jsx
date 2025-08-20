import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuickRegisterButtons from "./components/QuickRegisterButtons";
import { AppRoutes } from "./Routes/Routes"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <QuickRegisterButtons />
      <Footer />
    </BrowserRouter>
  );
}

export default App;



// // src/routes/Routes.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import LandingPage from "../pages/LandingPage";
// import LoginPage from "../pages/Auth/Login";
// import RegisterPage from "../pages/Auth/Register";
// import GoogleLogin from "../pages/Auth/GoogleLogin";
// import ProfilePage from "../pages/ProfilePage";
// import MatchesPage from "../pages/Matchpage";
// import ContactPage from "../pages/ContactPage";
// import AboutUs from "../pages/AboutUs";
// import AdminPanel from "../pages/Dashboard/Admin/AdminHome";
// import Dashboard from "../pages/Dashboard/Dashboard";
// import Plans from "../components/Plan";
// import PaymentPlans from "../pages/PaymentsPlans";
// import Search from "../pages/Search";
// import PremimumMembership from "../components/PremimumMembership";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/profile" element={<ProfilePage />} />
//       <Route path="/profile/:id" element={<ProfilePage />} />
//       <Route path="/matches" element={<MatchesPage />} />
//       <Route path="/contact" element={<ContactPage />} />
//       <Route path="/about" element={<AboutUs />} />
//       <Route path="/admin/*" element={<AdminPanel />} />
//       <Route path="/plans" element={<Plans />} />
//       <Route path="/payment" element={<PaymentPlans />} />
//       <Route path="/search" element={<Search />} />
//       <Route path="/premimum" element={<PremimumMembership />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

