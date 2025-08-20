import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Load users
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  // Mutation: Make Admin
  const makeAdminMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/admin/${id}`),
    onSuccess: (res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User promoted to Admin.", "success");
        refetch();
      }
    },
  });

  // Mutation: Make Premium
  const makePremiumMutation = useMutation({
    mutationFn: (email) => axiosSecure.patch(`/users/make-premium/${email}`),
    onSuccess: (res) => {
      if (
        res.data.updateUser?.modifiedCount > 0 ||
        res.data.updateBiodata?.modifiedCount > 0
      ) {
        Swal.fire("Success!", "User upgraded to Premium.", "success");
        refetch();
      }
    },
  });

  // Handlers
  const handleMakeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, promote",
    });

    if (confirm.isConfirmed) {
      makeAdminMutation.mutate(id);
    }
  };

  const handleMakePremium = async (email) => {
    const confirm = await Swal.fire({
      title: "Approve Premium Request?",
      text: `This will upgrade ${email} to premium.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, upgrade",
    });

    if (confirm.isConfirmed) {
      makePremiumMutation.mutate(email);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <title>Dashboard || Manage Users</title>
      <div className="p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#C2185B]">
          Manage Users
        </h2>

        {/* Search */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-300 p-2 md:p-3 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded shadow-lg bg-white">
            <thead className="bg-[#8E44AD] text-white text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Admin</th>
                <th className="p-3 text-center">Premium</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>

                  {/* Admin */}
                  <td className="p-3 text-center">
                    {user.role === "admin" ? (
                      <span className="text-green-600 font-semibold">
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-700 text-xs md:text-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>

                  {/* Premium */}
                  <td className="p-3 text-center">
                    {user.role === "premium" ? (
                      <span className="text-rose-700 font-semibold">
                        Premium
                      </span>
                    ) : user.isPremiumRequested ? (
                      <button
                        onClick={() => handleMakePremium(user.email)}
                        className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-700 text-xs md:text-sm"
                      >
                        Make Premium
                      </button>
                    ) : (
                      <span className="text-gray-400 italic text-xs">
                        No Request
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
