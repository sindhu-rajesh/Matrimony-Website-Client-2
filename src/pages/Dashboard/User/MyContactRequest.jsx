import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-contact-requests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contact-requests/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (biodataId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete your contact request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C2185B",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/my-contact-requests/remove`, {
          biodataId,
          userEmail: user.email,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire("Deleted!", "Your request has been removed.", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete the request.", "error");
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <title>Dashboard || My Contact Requests</title>

      <div className="w-11/12 mx-auto py-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#C2185B]">
          My Contact Requests
        </h2>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left">#</th>
                <th className="px-4 sm:px-6 py-3 text-left">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left">Biodata ID</th>
                <th className="px-4 sm:px-6 py-3 text-left">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left">Mobile No</th>
                <th className="px-4 sm:px-6 py-3 text-left">Email</th>
                <th className="px-4 sm:px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {requests.length > 0 ? (
                requests.map((req, index) => (
                  <tr key={req.biodataId} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3">{index + 1}</td>
                    <td className="px-4 sm:px-6 py-3">{req.name}</td>
                    <td className="px-4 sm:px-6 py-3">{req.biodataId}</td>
                    <td className="px-4 sm:px-6 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          req.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      {req.status === "approved" ? (
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full font-medium">
                          {req.mobile}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Hidden</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      {req.status === "approved" ? (
                        <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 text-xs rounded-full font-medium">
                          {req.email}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Hidden</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <button
                        onClick={() => handleDelete(req.biodataId)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No contact requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyContactRequest;
