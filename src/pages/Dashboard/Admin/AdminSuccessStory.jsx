import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Dialog } from "@headlessui/react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaHeartBroken } from "react-icons/fa";

const AdminSuccessStory = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch success stories
  const { data: successStories = [], isLoading } = useQuery({
    queryKey: ["admin-success-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-story");
      return res.data;
    },
  });

  const openModal = (story) => {
    setSelectedStory(story);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedStory(null);
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  if (successStories.length === 0) {
    return (
      <div className="text-center flex flex-col items-center justify-center gap-3 mt-10 text-gray-600">
        <FaHeartBroken className="text-6xl text-rose-400" />
        <p className="text-xl font-semibold">No success stories found</p>
        <p className="text-sm text-gray-500">
          Looks like no one has submitted their happy story yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <title>Dashboard || Success Story</title>
      <div className="p-6 bg-white shadow rounded-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-rose-700 text-center">
          All Success Stories
        </h2>

        <div>
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-rose-100 text-red-700 ">
              <tr>
                <th className="py-2 px-4 border">Male Biodata ID</th>
                <th className="py-2 px-4 border">Female Biodata ID</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {successStories.map((story, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border">{story.selfBiodataId}</td>
                  <td className="py-2 px-4 border">{story.partnerBiodataId}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => openModal(story)}
                      className="bg-rose-700 hover:bg-purple-500 text-white px-4 py-1 text-sm rounded"
                    >
                      View Story
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          {/* Modal Overlay */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg">
              <Dialog.Title className="text-lg font-bold mb-2 text-rose-700">
                Success Story
              </Dialog.Title>

              {selectedStory && (
                <>
                  <img
                    src={
                      selectedStory.image ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt="Couple"
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedStory.review}
                  </p>
                </>
              )}

              <div className="text-right mt-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-1 rounded"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminSuccessStory;
