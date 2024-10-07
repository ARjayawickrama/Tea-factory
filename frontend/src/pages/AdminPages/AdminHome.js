import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "../../components/Navigation_bar/Admin/AdminDashboard ";
import { FaUser, FaUsers } from "react-icons/fa";
import { BarChart } from "@mui/x-charts/BarChart";
import Main1 from "../../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
function AdminHome() {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchData();
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

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:5004/api/users");
      const contactsResponse = await axios.get("http://localhost:5004/contact");
      console.log("Contacts response:", contactsResponse.data);
      setUsers(usersResponse.data);
      setContacts(contactsResponse.data.contacts || contactsResponse.data);
      setFilteredContacts(
        contactsResponse.data.contacts || contactsResponse.data
      );
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.message.toLowerCase().includes(query)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5004/Checkout/orders");
      const data = await response.json();
      setOrders(data.orders); // Assuming the response contains an array of orders

      // Print the length of orders to the console
      console.log("Number of orders:", data.orders.length);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5004/InventoryProduct"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const userCount = users.length;

  return (
    <Box
      className=" relative right-16"
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-2 w-full ml-60 max-w-7xl  absolute">
          <div className="bg-white  rounded-lg shadow text-center  w-60 flex flex-col items-center justify-center relative left-7 top-3">
            <FaUsers className="text-yellow-500 text-3xl mb-2" />
            <a href="/Usermanagement" className="text-2xl font-bold">
              Total Users: {userCount}
            </a>
            <p className="text-gray-500">Welcome</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center w-60 flex flex-col items-center justify-center relative  left-24 top-3">
            <FaUser className="text-yellow-500 text-3xl mb-2" />
            <p className="text-2xl font-bold">Total 
              
            <p className="text-gray-500">{orders.length}</p>
              Orders</p>
          
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center   w-60 flex flex-col items-center justify-center relative left-40 top-3">
            <FaUser className="text-yellow-500 text-3xl mb-2" />
            <p className="text-2xl font-bold">Total 
              
            <p className="text-gray-500">{products.length}</p>
            Products</p>
          
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center flex  w-60 flex-col items-center justify-center relative left-56 top-3">
            <FaUser className="text-yellow-500 text-3xl mb-2" />
            <p className="text-2xl font-bold">Total 
              
            <p className="text-gray-500">{25}</p>
              Customers</p>
          
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center flex  w-60 flex-col items-center justify-center relative left-72 top-3">
            <FaUser className="text-yellow-500 text-3xl mb-2" />
            <p className="text-2xl font-bold">Total 
              
            <p className="text-gray-500">{74}</p>
              Employees</p>
          
          </div>


        

          {/* Bar Chart */}
          <div className="col-span-4 p-8 rounded-3xl">
          
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "user",
                    "orders ",
                    "products ",
                    "group D",
                    "group E",
                    "group F",
                  ],
                },
              ]}
              series={[{ data: [userCount, orders.length , products.length, 2, 6, 7] }]}
              width={750}
              height={500}
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg ml-24 mt-10 w-96">
            <div className="flex items-center mb-6">
              <img
                className="w-16 h-16 rounded-full"
                src={Main1}
                alt="Profile"
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">Contact Us</h2>
              </div>
            </div>
            <div className="flex items-center border-b mb-4 pb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="flex-grow p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="overflow-y-auto h-64">
              <ul>
                {filteredContacts.length ? (
                  filteredContacts.map((contact) => (
                    <li
                      key={contact._id}
                      className="flex items-center justify-between py-2 border-b cursor-pointer"
                    >
                      <span className="text-sm flex-1">{contact.name}</span>
                      <span className="text-sm flex-1 text-center">
                        {contact.email}
                      </span>
                      <span className="text-sm flex-1 text-right">
                        {contact.message}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No contacts available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}

export default AdminHome;
