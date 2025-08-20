import { useParams, useNavigate, NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import { motion } from "motion/react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useRole from "../../hooks/UseRole";

const BiodataDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch selected biodata
  const {
    data: biodata,
    isLoading: biodataLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["biodata", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata-details/${id}`);
      return res.data;
    },
  });

  // Fetch current user's own biodata
  const { data: myBiodata, isLoading: myBiodataLoading } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/user/${user.email}`);
      return res.data;
    },
    retry: false,
  });

  // Fetch similar biodatas
  const { data: similar = [] } = useQuery({
    queryKey: ["similar", biodata?.biodataType],
    enabled: !!biodata?.biodataType,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-biodatas`, {
        params: { biodataType: biodata.biodataType },
      });
      return res.data.filter((item) => item._id !== id).slice(0, 3);
    },
  });

  useEffect(() => {
    if (id) refetch();
  }, [id, refetch]);

  const handleAddToFavourites = async () => {
    const favData = {
      biodataId: biodata.biodataId,
      userEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/favourites", favData);

      if ((res.status === 200 && res.data.updated) || res.status === 201) {
        Swal.fire({
          title: "Added!",
          text: "This biodata has been added to your favourites.",
          icon: "success",
          confirmButtonColor: "#C2185B",
        });
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({
          title: "Info",
          text: err.response.data.message || "Already in favourites.",
          icon: "info",
          confirmButtonColor: "#C2185B",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#C2185B",
        });
      }
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata._id}`);
  };

  const handleCompleteBiodata = () => {
    navigate("/dashboard/edit-biodata");
  };

  const loading = isLoading || biodataLoading || myBiodataLoading;
  if (loading) return <LoadingSpinner />;
  if (isError || !biodata)
    return (
      <div className="text-center text-red-500 py-10 font-semibold">
        Failed to load biodata.
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Image */}
        <div className="md:w-1/3 rounded overflow-hidden shadow-md border">
          <img
            src={biodata.image}
            alt={biodata.name}
            className="w-full h-full object-cover aspect-[3/4]"
          />
        </div>

        {/* Right Details */}
        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#C2185B] mb-4">
              {biodata.name}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-gray-700 text-sm sm:text-base mb-8">
              <InfoItem label="Type" value={biodata.biodataType} />
              <InfoItem label="Age" value={biodata.age} />
              <InfoItem label="Occupation" value={biodata.occupation} />
              <InfoItem label="Height" value={`${biodata.height} ft`} />
              <InfoItem label="Weight" value={`${biodata.weight} kg`} />
              <InfoItem label="Race" value={biodata.race} />
              <InfoItem label="DOB" value={biodata.dob} />
              <InfoItem label="Father’s Name" value={biodata.fathersName} />
              <InfoItem label="Mother’s Name" value={biodata.mothersName} />
              <InfoItem
                label="Permanent Division"
                value={biodata.permanentDivision}
              />
              <InfoItem
                label="Present Division"
                value={biodata.presentDivision}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            {role === "premium" ? (
              <div className="bg-[#f9e6f1] p-4 rounded border border-[#C2185B] text-[#8E44AD] font-semibold">
                <h3 className="text-lg mb-2">Contact Information</h3>
                <p>
                  <strong>Phone:</strong> {biodata.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {biodata.email}
                </p>
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded border border-yellow-400 font-semibold">
                Contact info is visible to premium members only.
              </div>
            )}
          </div>
          {/* Complete Your Biodata Notice */}
          {!myBiodata && (
            <div className="bg-red-100 text-red-700 border border-red-400 p-4 rounded mb-4">
              ⚠️ Please complete your biodata first to send a contact request.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddToFavourites}
              className="bg-[#C2185B] text-white px-6 py-2 rounded hover:bg-[#8E44AD] transition flex-1 sm:flex-none"
            >
              Add to Favourites
            </button>

            {role !== "premium" &&
              (!myBiodata ? (
                <button
                  onClick={handleCompleteBiodata}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition flex-1 sm:flex-none"
                >
                  Complete Your Biodata
                </button>
              ) : (
                <button
                  onClick={handleRequestContact}
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition flex-1 sm:flex-none"
                >
                  Request Contact Info
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Similar Biodatas */}
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-[#8E44AD]">
            Similar Biodatas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {similar.map((bio) => (
              <motion.div
                key={bio._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={bio.image}
                  alt={bio.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{bio.name}</h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Age:</strong> {bio.age}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Division:</strong> {bio.permanentDivision}
                  </p>
                  <NavLink
                    to={`/biodata-details/${bio._id}`}
                    className="block w-full bg-gray text-block text-center py-2 rounded hover:bg-gray font-semibold"
                  >
                    View Profile
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};

// Helper component
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-gray-500 font-semibold">{label}</p>
    <p>{value || "-"}</p>
  </div>
);

export default BiodataDetails;
