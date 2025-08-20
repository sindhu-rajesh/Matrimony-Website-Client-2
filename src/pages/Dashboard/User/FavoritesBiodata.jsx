import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const FavoritesBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all favourites for current user
  const {
    data: favourites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favourites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favourites/${user.email}`);
      return res.data;
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (biodataId) => {
      return await axiosSecure.delete(`/favourites/${user.email}/${biodataId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favourites", user?.email]);
      Swal.fire({
        title: "Deleted!",
        text: "Favourite biodata has been removed.",
        icon: "success",
        confirmButtonColor: "#C2185B",
      });
    },
  });

  const handleDelete = (biodataId) => {
    // console.log(typeof biodataId);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this from your favourites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C2185B",
      cancelButtonColor: "#8E44AD",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(biodataId);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div className="text-center text-red-500 font-semibold py-6">
        Failed to load favourites.
      </div>
    );
  }

  return (
    <div>
      <title>Dashboard || Favorites Biodata</title>

      <div className="w-11/12 mx-auto py-10">
        <h2 className="text-3xl text-center font-bold mb-6 text-[#C2185B]">
          My Favourite Biodatas
        </h2>
        {favourites.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            You have no favourite biodatas yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow">
              <thead className="bg-[#C2185B] text-white">
                <tr>
                  <th className="py-3 px-4 border">Name</th>
                  <th className="py-3 px-4 border">Biodata ID</th>
                  <th className="py-3 px-4 border">Permanent Address</th>
                  <th className="py-3 px-4 border">Occupation</th>
                  <th className="py-3 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {favourites.map((fav) => (
                  <tr key={fav._id} className="text-center hover:bg-gray-100">
                    <td className="py-2 px-4 border">{fav.name}</td>
                    <td className="py-2 px-4 border">{fav.biodataId}</td>
                    <td className="py-2 px-4 border">
                      {fav.permanentDivision}
                    </td>
                    <td className="py-2 px-4 border">{fav.occupation}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleDelete(fav.biodataId)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesBiodata;
