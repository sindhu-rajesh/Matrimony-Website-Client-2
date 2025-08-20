import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ViewBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["viewBiodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: requestPremium } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/biodatas/premium-status/${id}`, {
        premiumStatus: "pending",
      });
    },
    onSuccess: () => {
      Swal.fire(
        "Requested!",
        "Your request has been sent to admin.",
        "success"
      );
      queryClient.invalidateQueries(["viewBiodata", user?.email]);
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    },
  });

  const handleRequestPremium = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to request premium status for this biodata?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#C2185B",
      cancelButtonColor: "#8E44AD",
      confirmButtonText: "Yes, request it!",
    }).then((result) => {
      if (result.isConfirmed) {
        requestPremium(biodata._id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  // Determine button label and status
  let buttonText = "Make Biodata Premium";
  let isButtonDisabled = false;

  if (biodata?.premiumStatus === "pending") {
    buttonText = "Already Requested";
    isButtonDisabled = true;
  } else if (biodata?.premiumStatus === "approved") {
    buttonText = "Premium Member";
    isButtonDisabled = true;
  }

  if (!biodata) {
    return (
      <motion.div
        className="max-w-xl mx-auto my-20 p-8 bg-white shadow-md rounded-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/6598/6598510.png"
          alt="No Data"
          className="w-32 mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-[#C2185B] mb-2">
          No Biodata Found
        </h2>
        <p className="text-gray-600 mb-6">
          You haven’t created your biodata yet. Start now to join our community!
        </p>
        <Link
          to="/dashboard/edit-biodata"
          className="bg-[#C2185B] hover:bg-[#8E44AD] text-white px-6 py-3 rounded-md font-semibold transition-all duration-300"
        >
          Create Biodata
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      <title>Dashboard || View Biodata</title>
      <motion.div
        className="w-11/12 mx-auto my-2 p-8 bg-white shadow-xl rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-[#C2185B] mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          My Biodata
        </motion.h2>

        <div className="grid gap-6 grid-cols-1">
          <div className="flex justify-center">
            <img
              src={biodata.image}
              alt="Profile"
              className="w-[80%] h-72 rounded-xl object-cover border-4 border-[#8E44AD]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["Biodata Type", biodata.biodataType],
              ["Name", biodata.name],
              ["DOB", biodata.dob],
              ["Height", biodata.height],
              ["Weight", biodata.weight],
              ["Age", biodata.age],
              ["Occupation", biodata.occupation],
              ["Race (Skin color)", biodata.race],
              ["Father's Name", biodata.fatherName],
              ["Mother's Name", biodata.motherName],
              ["Permanent Division", biodata.permanentDivision],
              ["Present Division", biodata.presentDivision],
              ["Expected Partner Age", biodata.expectedPartnerAge],
              ["Expected Partner Height", biodata.expectedPartnerHeight],
              ["Expected Partner Weight", biodata.expectedPartnerWeight],
              ["Email", biodata.email],
              ["Phone", biodata.mobile],
            ].map(([label, value], i) => (
              <motion.div
                key={label}
                className="bg-[#F8F6F9] p-4 rounded-md shadow-sm"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <p className="font-medium text-[#8E44AD]">{label}:</p>
                <p className="text-gray-800">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            disabled={isButtonDisabled}
            onClick={handleRequestPremium}
            className={`${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#C2185B] hover:bg-[#8E44AD]"
            } text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300`}
          >
            {buttonText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewBiodata;
