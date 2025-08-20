// src/pages/Dashboard/AdminHome.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUsers,
  FaVenusMars,
  FaUserTie,
  FaUserAlt,
  FaDollarSign,
} from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";
import PieCharts from "../../../components/PieCharts";
import { Link } from "react-router";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const cardStyle =
    "flex items-center gap-4 p-6 rounded-lg shadow bg-white border-l-4";

  return (
    <div>
      <title>Dashboard || Home</title>
      {/* Go to Website Button */}
      <div className="flex justify-end mb-6 py-4">
        <Link
          to="/"
          className="bg-[#C2185B] text-white px-6 py-2 rounded-md hover:bg-[#a0144d] transition"
        >
          🌐 Go to Website
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Total Biodata */}
        <div className={`${cardStyle} border-[#C2185B]`}>
          <FaUsers className="text-3xl text-[#C2185B]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Biodata
            </h3>
            <p className="text-2xl font-bold text-[#C2185B]">
              {stats.totalBiodata || 0}
            </p>
          </div>
        </div>

        {/* Male Biodata */}
        <div className={`${cardStyle} border-blue-500`}>
          <FaUserTie className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Male Biodatas
            </h3>
            <p className="text-2xl font-bold text-blue-500">
              {stats.maleCount || 0}
            </p>
          </div>
        </div>

        {/* Female Biodata */}
        <div className={`${cardStyle} border-rose-500`}>
          <FaUserAlt className="text-3xl text-rose-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Female Biodatas
            </h3>
            <p className="text-2xl font-bold text-rose-500">
              {stats.femaleCount || 0}
            </p>
          </div>
        </div>

        {/* Premium Biodata */}
        <div className={`${cardStyle} border-purple-500`}>
          <FaVenusMars className="text-3xl text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Premium Biodatas
            </h3>
            <p className="text-2xl font-bold text-purple-500">
              {stats.premiumCount || 0}
            </p>
          </div>
        </div>

        {/* Revenue */}
        <div className={`${cardStyle} border-green-500`}>
          <FaDollarSign className="text-3xl text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-green-600">
              ${stats.totalRevenue?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>
      </div>
      <div className="py-4">
        {/* Pie Chart */}
        <PieCharts stats={stats} />
      </div>
    </div>
  );
};

export default AdminHome;
