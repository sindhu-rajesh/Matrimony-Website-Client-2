import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Lottie from "lottie-react";
import weddingAnimation from "../../../assets/Lottie/Wedding.json"; // 💍 use your path

const GotMarried = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const imageHostKey = import.meta.env.VITE_image_upload_key;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setValue("image", data.data.display_url);
        setPreviewImage(data.data.display_url);
        Swal.fire("Uploaded!", "Image uploaded successfully!", "success");
      } else {
        Swal.fire("Error", "Image upload failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/success-story", data);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your story has been submitted.", "success");
        reset();
        setPreviewImage("");
      }
    } catch (error) {
      console.error("Error submitting success story", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div>
      <title>Dashboard || Got Married</title>

      <div className="w-11/12 mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white shadow-2xl rounded-xl p-6 md:p-12">
          {/* Lottie Animation */}
          <div className="hidden md:block">
            <Lottie animationData={weddingAnimation} loop={true} />
          </div>

          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#C2185B]">
              💍 Share Your Success Story
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block mb-1 font-semibold text-[#8E44AD]">
                  Your Biodata ID
                </label>
                <input
                  type="text"
                  {...register("selfBiodataId", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter Your Biodata ID"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-[#8E44AD]">
                  Partner's Biodata ID
                </label>
                <input
                  type="text"
                  {...register("partnerBiodataId", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter Your Partner Biodata ID"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-[#8E44AD]">
                  Marriage Date
                </label>
                <input
                  type="date"
                  {...register("marriageDate", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-[#8E44AD]">
                  Upload Couple Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full"
                />
                {uploading && (
                  <p className="text-sm mt-2 text-yellow-600">
                    Uploading image...
                  </p>
                )}
              </div>

              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Couple Preview"
                    className="w-full rounded-md shadow-md"
                  />
                </div>
              )}

              <input type="hidden" {...register("image", { required: true })} />

              <div>
                <label className="block mb-1 font-semibold text-[#8E44AD]">
                  Your Review
                </label>
                <textarea
                  {...register("review", { required: true })}
                  rows={5}
                  className="textarea textarea-bordered w-full"
                  placeholder="Share your feelings about using this website..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="p-2 rounded-xl w-full bg-rose-700 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2"
              >
                <FaUpload /> Submit Story
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GotMarried;
