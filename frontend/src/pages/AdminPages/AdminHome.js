import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "../../components/Navigation_bar/Admin/AdminDashboard ";
import { FaUser, FaUsers } from "react-icons/fa";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchUsers();
    }

    const handlePopState = () => {
      navigate("/", { replace: true });
      window.history.pushState(null, null, "/");
    };

    window.history.pushState(null, null, "/");
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5004/api/users");
      setUsers(response.data);
      setError(null); 
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AdminDashboard />

      {error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 w-full ml-60 max-w-6xl">
       
          <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center">
            <FaUsers className="text-yellow-500 text-3xl mb-2" />
            <a href="/Usermanagement" className="text-2xl font-bold">
              Total Users: {users.length}
            </a>
            <p className="text-gray-500">Welcome</p>
          </div>

       
          <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center">
            <FaUser className="text-yellow-500 text-3xl mb-2" />
            <p className="text-2xl font-bold">Total Orders</p>
            <p className="text-gray-500">Welcome</p>
          </div>

          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center"
            >
              <FaUser className="text-yellow-500 text-3xl mb-2" />
              <p className="text-2xl font-bold">Total Users: {users.length}</p>
              <p className="text-gray-500">Welcome</p>
            </div>
          ))}

          <div className="col-span-4 p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">Working Areas</p>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "group A",
                    "group B",
                    "group C",
                    "group D",
                    "group E",
                    "group F",
                  ],
                },
              ]}
              series={[
                { data: [4, 3, 5, 2, 6, 7] },
                { data: [1, 6, 3, 4, 5, 2] },
                { data: [2, 5, 6, 7, 3, 4] },
              ]}
              width={700}
              height={400}
            />
          </div>
          <div className="  mt-44 bg-white p-4 rounded-lg shadow h-60  w-64 ml-20  ">
            <PieChart
              className=" relative right-12"
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>
        </div>
      )}
    </Box>
  );
}

export default AdminHome;
