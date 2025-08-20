import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      Swal.fire("Success", "Logged in successfully!", "success");
      navigate("/dashboard/home");  // Ensure "/" points to your dashboard route
    } catch (error) {
      Swal.fire("Error", error.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-block-700">
          Login to Matrimony
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-block-700 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-gray-700"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-block-700 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-gray-700"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-block-500 text-sm mt-1">{errors.password.message}</p>
            )}
            <div className="text-right mt-1">
              <Link
                to="#"
                className="text-sm font-medium text-gray-500 hover:text-block-700"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}  // Disabled while submitting
            className="w-full py-2 rounded font-semibold bg-block-700 text-block shadow-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center my-4 text-sm text-gray-500">OR</div>

        <GoogleLogin />

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-block-700 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
