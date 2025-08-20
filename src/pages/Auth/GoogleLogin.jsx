import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard/home";

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Save user info to DB
      await axios.post("https://find-my-mate-server.vercel.app/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from);
    } catch (error) {
      console.error("Google login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message || "Something went wrong. Try again later.",
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border border-purple-700 text-purple-700 py-2 rounded hover:bg-purple-100 transition"
    >
      <FcGoogle className="text-xl" />
      Login with Google
    </button>
  );
};

export default GoogleLogin;
