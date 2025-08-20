import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch all users who requested premium
  const {
    data: premiumRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["premiumRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/premium-requests");
      return res.data;
    },
  });

  // ✅ Reuse the mutation you already used in Manage Users
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

  const handleMakePremium = async (email) => {
    const confirm = await Swal.fire({
      title: "Approve Premium?",
      text: `Upgrade ${email} to premium access?`,
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
    <div className="p-6">
      <title>Dashboard || Approved Premium</title>
      <h2 className="text-3xl font-bold mb-6 text-center text-[#C2185B]">
        Approved Premium Requests
      </h2>

      {premiumRequests.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending premium requests found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded shadow bg-white">
            <thead className="bg-[#8E44AD] text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Biodata ID</th>
                <th className="p-3 text-center">Make Premium</th>
              </tr>
            </thead>
            <tbody>
              {premiumRequests.map((user, idx) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.biodataId || "N/A"}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleMakePremium(user.email)}
                      className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
                    >
                      Make Premium
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedPremium;
