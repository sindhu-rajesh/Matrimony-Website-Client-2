import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { motion } from "motion/react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdSearchOff } from "react-icons/md";
import axios from "axios";

const AllBiodatas = () => {
  const [filters, setFilters] = useState({
    biodataType: "",
    division: "",
    minAge: "",
    maxAge: "",
  });

  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isLoading } = useQuery({
    queryKey: ["biodatas", filters, page],
    queryFn: async () => {
      const res = await axios.get(
        "https://find-my-mate-server.vercel.app/biodatas",
        {
          params: { ...filters, page, limit },
        }
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const biodatas = data?.biodatas || [];
  const totalPages = data?.totalPages || 1;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <div>
      <title>Matrimony || Biodatas</title>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-8"
      >
        {/* Sticky Filter Sidebar */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-100 p-6 rounded-md space-y-6 sticky top-24"
          >
            <h2 className="text-xl font-bold text-block-700">Filter Biodatas</h2>

            {/* Biodata Type */}
            <div>
              <label className="block font-medium mb-1">Biodata Type</label>
              <select
                name="biodataType"
                value={filters.biodataType}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="block font-medium mb-1">Division</label>
              <select
                name="division"
                value={filters.division}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              >
                <option value="">All</option>
                {[
                  "Dhaka",
                  "Chattagram",
                  "Rangpur",
                  "Barisal",
                  "Khulna",
                  "Mymensingh",
                  "Sylhet",
                ].map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block font-medium mb-1">Age Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minAge"
                  value={filters.minAge}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full border border-gray-300 rounded px-2 py-2 bg-white"
                />
                <input
                  type="number"
                  name="maxAge"
                  value={filters.maxAge}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full border border-gray-300 rounded px-2 py-2 bg-white"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Biodata Display Section */}
        <div className="md:col-span-3">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {biodatas.length === 0 ? (
                  <motion.div
                    key="no-data"
                    className="col-span-full flex flex-col items-center justify-center text-center text-gray-500 py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <MdSearchOff className="text-5xl text-rose-600 mb-3" />
                    <h3 className="text-lg font-semibold">No Biodatas Found</h3>
                    <p className="text-sm mt-1">
                      Try adjusting your filter criteria.
                    </p>
                  </motion.div>
                ) : (
                  biodatas.map((biodata) => (
                    <motion.div
                      key={biodata._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded shadow hover:shadow-lg transition duration-300 overflow-hidden"
                    >
                      <img
                        src={biodata.image}
                        alt={biodata.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 space-y-1 text-sm">
                        <p>
                          <span className="font-semibold">ID:</span>{" "}
                          {biodata.biodataId}
                        </p>
                        <p>
                          <span className="font-semibold">Type:</span>{" "}
                          {biodata.biodataType}
                        </p>
                        <p>
                          <span className="font-semibold">Division:</span>{" "}
                          {biodata.permanentDivision}
                        </p>
                        <p>
                          <span className="font-semibold">Age:</span>{" "}
                          {biodata.age}
                        </p>
                        <p>
                          <span className="font-semibold">Occupation:</span>{" "}
                          {biodata.occupation}
                        </p>

                        <NavLink
                          to={`/biodata-details/${biodata._id}`}
                          className="block text-center mt-3 w-full bg-gray-700 hover:bg-gray-500 text-white font-medium py-2 rounded"
                        >
                          View Profile
                        </NavLink>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 text-sm rounded ${
                      page === 1
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-rose-600 text-white hover:bg-rose-700"
                    }`}
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setPage(idx + 1)}
                      className={`px-3 py-1 text-sm rounded ${
                        page === idx + 1
                          ? "bg-rose-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className={`px-4 py-2 text-sm rounded ${
                      page === totalPages
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-rose-600 text-white hover:bg-rose-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AllBiodatas;
