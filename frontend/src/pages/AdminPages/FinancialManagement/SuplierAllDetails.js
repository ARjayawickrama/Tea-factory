import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import axios from "axios";
import AdminDashboard from "../../../components/Navigation_bar/Admin/AdminDashboard ";
import Pay from "../FinancialManagement/pay";
const SuplierAllDetails = () => {
  const [financialSupplier, setFinancialSupplier] = useState({
    name: "",
    quantity: "",
    email: "",
    rawMaterial: "",
    amount: "",
  });

  const [editFinancialSupplier, setEditFinancialSupplier] = useState({
    name: "",
    quantity: "",
    email: "",
    rawMaterial: "",
    amount: "",
  });

  const [suppliers, setSuppliers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const navigate = useNavigate();

  // Define prices for each raw material
  const priceList = {
    "Black Tea Leaves": 300,
    "Tea Bags": 100,
    Pouches: 200,
    "Cartons and Boxes": 0, // Assuming price is 0 for demonstration
    "Labels and Branding Stickers": 0,
    Herbs: 0,
    "Natural Essences": 0,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5004/FinancialSupplier")
      .then((response) => setSuppliers(response.data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancialSupplier({
      ...financialSupplier,
      [name]: value,
    });

    // Calculate amount based on raw material and quantity
    if (name === "rawMaterial" || name === "quantity") {
      const quantity = name === "quantity" ? value : financialSupplier.quantity;
      const rawMaterial =
        name === "rawMaterial" ? value : financialSupplier.rawMaterial;

      if (rawMaterial && quantity) {
        const amount = priceList[rawMaterial] * quantity;
        setFinancialSupplier({
          ...financialSupplier,
          amount: amount,
          [name]: value,
        });
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFinancialSupplier({
      ...editFinancialSupplier,
      [name]: value,
    });

    // Calculate amount based on raw material and quantity during edit
    if (name === "rawMaterial" || name === "quantity") {
      const quantity =
        name === "quantity" ? value : editFinancialSupplier.quantity;
      const rawMaterial =
        name === "rawMaterial" ? value : editFinancialSupplier.rawMaterial;

      if (rawMaterial && quantity) {
        const amount = priceList[rawMaterial] * quantity;
        setEditFinancialSupplier({
          ...editFinancialSupplier,
          amount: amount,
          [name]: value,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5004/FinancialSupplier", financialSupplier)
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setFinancialSupplier({
          name: "",
          amount: "",
          quantity: "",
          email: "",
          rawMaterial: "",
        });
      })
      .catch((error) => console.error("Error adding supplier:", error));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditFinancialSupplier(suppliers[index]);
    setOpenEdit(true);
  };

  const handleModalClose = () => {
    setOpenEdit(false);
    setEditFinancialSupplier({
      name: "",
      amount: "",
      quantity: "",
      email: "",
      rawMaterial: "",
    });
    setEditIndex(null);
  };

  const handleModalSave = () => {
    axios
      .put(
        `http://localhost:5004/FinancialSupplier/${suppliers[editIndex]._id}`,
        editFinancialSupplier
      )
      .then((response) => {
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[editIndex] = response.data;
        setSuppliers(updatedSuppliers);
        handleModalClose();
      })
      .catch((error) => console.error("Error updating supplier:", error));
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:5004/FinancialSupplier/${suppliers[deleteIndex]._id}`
      )
      .then(() => {
        const updatedSuppliers = suppliers.filter((_, i) => i !== deleteIndex);
        setSuppliers(updatedSuppliers);
        setOpenDeleteConfirm(false);
        setDeleteIndex(null);
      })
      .catch((error) => console.error("Error deleting supplier:", error));
  };

  const handleDeleteCancel = () => {
    setOpenDeleteConfirm(false);
    setDeleteIndex(null);
  };
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handlePayClick = () => {
    setShowModal(true); // Show modal on button click
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal on overlay or close button click
  };

  return (
 
      <div className="w-9/12">
        <div className="container mt-4">
        

         
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Amount</th>
              
                
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.amount}</td>
                
                  <td>
                    <div>
                      {/* Button to trigger the modal */}
                      <button
                        className="your-button-class" // Add button class for styling
                        onClick={handlePayClick} // Show modal on click
                      >
                        ADD
                      </button>

                      {/* Modal */}
                      {showModal && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white p-6 rounded shadow-lg ">
                            {/* Close button */}
                            <button
                              className="text-red-500 hover:text-red-700 float-right"
                              onClick={handleCloseModal} // Close modal
                            >
                              X
                            </button>

                            {/* Render the Pay form */}
                            <Pay />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
};

export default SuplierAllDetails;
