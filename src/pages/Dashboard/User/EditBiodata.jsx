import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const EditBiodata = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [previewImg, setPreviewImg] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("imageFile");
  const imageUrl = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewImg(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (imageUrl) {
      setPreviewImg(imageUrl);
    } else if (biodata?.image) {
      setPreviewImg(biodata.image);
    } else {
      setPreviewImg("");
    }
  }, [imageFile, imageUrl, biodata]);

  useEffect(() => {
    if (biodata) {
      Object.keys(biodata).forEach((key) => {
        if (key !== "_id") setValue(key, biodata[key]);
      });
    }
  }, [biodata, setValue]);

  const imgbbApiKey = import.meta.env.VITE_image_upload_key;

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      data.email = user?.email;

      if (data.imageFile && data.imageFile.length > 0) {
        const formData = new FormData();
        formData.append("image", data.imageFile[0]);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await res.json();

        if (result.success) {
          data.image = result.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      delete data.imageFile;

      await axiosSecure.put("/biodatas", data);

      Swal.fire("Success", "Biodata saved successfully!", "success");
      queryClient.invalidateQueries(["biodata", user?.email]);
      navigate("/dashboard/view-biodata");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <title>Dashboard || Edit Biodata</title>

      <div className="w-11/12 mx-auto my-12 p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-[#C2185B] mb-10 tracking-wide">
          {biodata ? "Edit" : "Create"} Your Biodata
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Grid with 2 columns for paired fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {/* 1. Biodata Type */}
            <div>
              <label className="block font-semibold mb-2">Biodata Type</label>
              <select
                {...register("biodataType", { required: true })}
                className={`select select-bordered w-full ${
                  errors.biodataType ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.biodataType && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 2. Name */}
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className={`input input-bordered w-full ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 3. Date of Birth */}
            <div>
              <label className="block font-semibold mb-2">Date of Birth</label>
              <input
                type="date"
                {...register("dob", { required: true })}
                className={`input input-bordered w-full ${
                  errors.dob ? "border-red-500" : ""
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 4. Height */}
            <div>
              <label className="block font-semibold mb-2">Height</label>
              <select
                {...register("height", { required: true })}
                className={`select select-bordered w-full ${
                  errors.height ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="5'0">5'0</option>
                <option value="5'5">5'5</option>
                <option value="6'0">6'0</option>
              </select>
              {errors.height && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 5. Weight */}
            <div>
              <label className="block font-semibold mb-2">Weight</label>
              <select
                {...register("weight", { required: true })}
                className={`select select-bordered w-full ${
                  errors.weight ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="50kg">50kg</option>
                <option value="60kg">60kg</option>
                <option value="70kg">70kg</option>
              </select>
              {errors.weight && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 6. Age */}
            <div>
              <label className="block font-semibold mb-2">Age</label>
              <input
                type="number"
                {...register("age", { required: true })}
                className={`input input-bordered w-full ${
                  errors.age ? "border-red-500" : ""
                }`}
                placeholder="Your age"
                min={18}
              />
              {errors.age && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 7. Occupation */}
            <div>
              <label className="block font-semibold mb-2">Occupation</label>
              <select
                {...register("occupation", { required: true })}
                className={`select select-bordered w-full ${
                  errors.occupation ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Engineer">Engineer</option>
                <option value="Teacher">Teacher</option>
                <option value="Doctor">Doctor</option>
              </select>
              {errors.occupation && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 8. Race */}
            <div>
              <label className="block font-semibold mb-2">
                Race (Skin Color)
              </label>
              <select
                {...register("race", { required: true })}
                className={`select select-bordered w-full ${
                  errors.race ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Fair">Fair</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
              {errors.race && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 9. Father's Name */}
            <div>
              <label className="block font-semibold mb-2">Father's Name</label>
              <input
                type="text"
                {...register("fatherName", { required: true })}
                className={`input input-bordered w-full ${
                  errors.fatherName ? "border-red-500" : ""
                }`}
                placeholder="Your father's name"
              />
              {errors.fatherName && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 10. Mother's Name */}
            <div>
              <label className="block font-semibold mb-2">Mother's Name</label>
              <input
                type="text"
                {...register("motherName", { required: true })}
                className={`input input-bordered w-full ${
                  errors.motherName ? "border-red-500" : ""
                }`}
                placeholder="Your mother's name"
              />
              {errors.motherName && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 11. Permanent Division */}
            <div>
              <label className="block font-semibold mb-2">
                Permanent Division
              </label>
              <select
                {...register("permanentDivision", { required: true })}
                className={`select select-bordered w-full ${
                  errors.permanentDivision ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Sylhet">Sylhet</option>
              </select>
              {errors.permanentDivision && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 12. Present Division */}
            <div>
              <label className="block font-semibold mb-2">
                Present Division
              </label>
              <select
                {...register("presentDivision", { required: true })}
                className={`select select-bordered w-full ${
                  errors.presentDivision ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Sylhet">Sylhet</option>
              </select>
              {errors.presentDivision && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 13. Expected Partner Age */}
            <div>
              <label className="block font-semibold mb-2">
                Expected Partner Age
              </label>
              <input
                type="number"
                {...register("expectedPartnerAge", { required: true })}
                className={`input input-bordered w-full ${
                  errors.expectedPartnerAge ? "border-red-500" : ""
                }`}
                placeholder="Expected partner age"
                min={18}
              />
              {errors.expectedPartnerAge && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 14. Expected Partner Height */}
            <div>
              <label className="block font-semibold mb-2">
                Expected Partner Height
              </label>
              <select
                {...register("expectedPartnerHeight", { required: true })}
                className={`select select-bordered w-full ${
                  errors.expectedPartnerHeight ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="5'0">5'0</option>
                <option value="5'5">5'5</option>
                <option value="6'0">6'0</option>
              </select>
              {errors.expectedPartnerHeight && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 15. Expected Partner Weight */}
            <div>
              <label className="block font-semibold mb-2">
                Expected Partner Weight
              </label>
              <select
                {...register("expectedPartnerWeight", { required: true })}
                className={`select select-bordered w-full ${
                  errors.expectedPartnerWeight ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="50kg">50kg</option>
                <option value="60kg">60kg</option>
                <option value="70kg">70kg</option>
              </select>
              {errors.expectedPartnerWeight && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 16. Mobile Number */}
            <div>
              <label className="block font-semibold mb-2">Mobile Number</label>
              <input
                type="text"
                {...register("mobile", { required: true })}
                className={`input input-bordered w-full ${
                  errors.mobile ? "border-red-500" : ""
                }`}
                placeholder="+8801XXXXXXXXX"
              />
              {errors.mobile && (
                <p className="text-red-500 mt-1 text-sm">
                  This field is required
                </p>
              )}
            </div>

            {/* 17. Email (readonly) */}
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Image Upload & Preview Section - full width */}
          <div>
            <label className="block font-semibold mb-2">
              Profile Image Link (or upload below)
            </label>
            <input
              type="url"
              {...register("image")}
              placeholder="Enter image URL"
              className="input input-bordered w-full mb-3"
            />

            <label className="block font-semibold mb-2">
              Or Upload Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("imageFile")}
              className="file-input file-input-bordered w-full"
            />

            {previewImg && (
              <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-gray-300 max-w-xs mx-auto">
                <img
                  src={previewImg}
                  alt="Profile preview"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={saving}
              className={`w-full text-white font-extrabold text-lg py-4 rounded-xl shadow-lg transition-transform duration-300 ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#C2185B] to-[#8E44AD] hover:scale-105"
              }`}
            >
              {saving ? "Publishing..." : "Save & Publish Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBiodata;
