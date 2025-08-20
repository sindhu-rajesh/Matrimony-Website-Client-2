import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["biodataContactRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas/contact-requests");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: ({ email, biodataId }) =>
      axiosSecure.patch("/biodatas/approve-contact-request", {
        userEmail: email,
        biodataId,
      }),
    onSuccess: (res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Approved!", "Contact request approved.", "success");
        refetch();
      }
    },
  });

  return (
    <div>
      <title>Dashboard || Approve Contact Requests</title>
      <div className="px-4 md:px-8 py-8">
        <h2 className="text-3xl font-bold text-center text-rose-700 mb-8">
          Approved Contact Requests
        </h2>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-rose-100 text-rose-700 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Biodata ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {requests.map((req, index) => (
                <tr
                  key={index}
                  className="hover:bg-rose-50 transition duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{req.name}</td>
                  <td className="px-6 py-4">{req.email}</td>
                  <td className="px-6 py-4">{req.biodataId}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {req.status === "pending" ? (
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You are about to approve this contact request.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#C2185B",
                            cancelButtonColor: "#8E44AD",
                            confirmButtonText: "Yes, approve it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              approveMutation.mutate({
                                email: req.email,
                                biodataId: req.biodataId,
                              });
                            }
                          });
                        }}
                        className="px-3 py-1 rounded bg-rose-600 text-white hover:bg-rose-700 text-sm"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-600 text-sm font-medium">
                        Approved
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && (
            <div className="py-10 text-center text-gray-500 text-lg">
              No contact requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedContactRequest;
