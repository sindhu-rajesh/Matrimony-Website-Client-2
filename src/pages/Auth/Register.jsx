import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  // 🔄 Handle Registration Submit
  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);

      const userInfo = {
        name: data.name,
        email: data.email.toLowerCase(),
        role: "user",
        photoURL: profilePic,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axios.post(
        "https://find-my-mate-server.vercel.app/users",
        userInfo
      );

      await updateUserProfile({ displayName: data.name, photoURL: profilePic });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already registered. Please login or use a different email.",
        });
      } else {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message || "Try again later.",
        });
      }
    }
  };

  // 🖼️ Handle Image Upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-white to-white px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-block text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-2 text-block">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                errors.name
                  ? "border-block-500 focus:border-block-600"
                  : "border-gray-300 focus:border-[#8E44AD]"
              }`}
            />
            {errors.name && (
              <p className="text-block-600 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block font-semibold mb-2 text-block">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="mt-3 w-24 h-24 rounded-full object-cover shadow-md border-2 border-gray"
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2 text-block">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                errors.email
                  ? "border-gray-500 focus:border-gray-600"
                  : "border-gray-300 focus:border-[#8E44AD]"
              }`}
            />
            {errors.email && (
              <p className="text-block-600 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-2 text-block">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                errors.password
                  ? "border-gray-500 focus:border-gray-600"
                  : "border-gray-300 focus:border-[#8E44AD]"
              }`}
            />
            {errors.password && (
              <p className="text-block-600 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="#"
              className="text-sm text-block hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray hover:bg-block transition-colors text-block font-bold py-3 rounded-lg shadow-md"
          >
            Register
          </button>
        </form>
        <div className="text-center py-4">OR</div>
        <GoogleLogin></GoogleLogin>

        {/* Link to Login */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-block font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
