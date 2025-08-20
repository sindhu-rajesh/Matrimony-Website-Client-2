import React from "react";
import UserHome from "./User/UserHome";
import AdminHome from "./Admin/AdminHome";
import useRole from "../../hooks/UseRole";
import LoadingSpinner from "../../components/LoadingSpinner";

const Dashboard = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {role === "user" || role === "premium" ? (
        <UserHome />
      ) : role === "admin" ? (
        <AdminHome />
      ) : (
        <p className="text-center mt-10 text-red-500">Invalid user role.</p>
      )}
    </div>
  );
};

export default Dashboard;



