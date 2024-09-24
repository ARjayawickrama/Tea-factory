import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import ShowMaintenanceMembers from "../../../pages/AdminPages/EquipmentMaintenance/Show_maintenance_members";
import Request from "../../../pages/AdminPages/EquipmentMaintenance/Request/Request";
import SupervisorIssue from "../../../pages/AdminPages/EquipmentMaintenance/Request/SupervisorIssue";
import RequestAccept from "../../../pages/AdminPages/EquipmentMaintenance/Request/RequestAccept";
import issue from "../../../assets/issue_.png";
import imageSrc from "../../../assets/maintenance.png";
import productivity from "../../../assets/productivity_.png";
import consultation from "../../../assets/consultation.png";
import axios from "axios";
import { Link } from "react-router-dom";
export default function EquipmentCard() {
  const [isSupervisorIssueOpen, setSupervisorIssueOpen] = useState(false);
  const [maintaininMembersLength, setMaintaininMembersLength] = useState(0);

  const openSupervisorIssue = () => {
    setSupervisorIssueOpen(true);
  };

  const closeSupervisorIssue = () => {
    setSupervisorIssueOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5004/MaintaininMember"
      );
      const data = response.data.maintaininMembers;
      setMaintaininMembersLength(data.length);
    } catch (error) {
      console.error("Failed to fetch maintainin members:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDataUpdate = (length) => {
    setMaintaininMembersLength(length);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-3">
        <div className="flex items-center justify-center shadow-2xl bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <Link
            to="/ScheduleMaintenance"
            className="flex flex-col items-center w-full h-full"
          >
            <img
              src={imageSrc}
              alt="Schedule Maintenance"
              className="w-24 h-24 mb-20 relative top-12"
            />
            <span className="text-center text-teal-500 text-lg font-medium">
              Schedule Maintenance
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-center shadow-2xl bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <Link
            to="/Issue_Maintaining"
            className="flex flex-col items-center w-full h-full"
          >
            <img
              src={issue}
              alt="Issue Maintaining"
              className="w-24 h-24 mb-20 relative top-12"
            />
            <span className="text-center text-teal-500 text-lg font-medium">
              Issue Maintenance
            </span>
          </Link>
        </div>

      
        <div className="flex items-center justify-center shadow-2xl bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <Link
            to="/Resources"
            className="flex flex-col items-center w-full h-full"
          >
            <img
              src={productivity}
              alt="Issue Maintaining"
              className="w-24 h-24 mb-20 relative top-12"
            />
            <span className="text-center text-teal-500 text-lg font-medium">
            Resource
            </span>
          </Link>
        </div>





        <div className="flex items-center justify-center shadow-2xl bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <div style={{ width: 200, height: 200, marginRight: 40 }}>
            <Stack direction="row" spacing={2} className="w-full h-full">
              <Gauge
                value={maintaininMembersLength}
                startAngle={0}
                endAngle={360}
                innerRadius="80%"
                outerRadius="100%"
              />
            </Stack>
          </div>
        </div>

        <div className="flex items-center justify-center shadow-2xl bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <div className="flex flex-col items-center">
            <img
              src={consultation}
              alt="Supervisor Issue"
              className="w-24 h-24 mb-2"
            />
            <div
              className="text-center text-teal-500 text-lg font-medium cursor-pointer"
              onClick={openSupervisorIssue}
            >
              Supervisor Issue
            </div>
          </div>
        </div>

        <Request />
      </div>

      <ShowMaintenanceMembers onDataUpdate={handleDataUpdate} />

      {isSupervisorIssueOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 ml-32 rounded-lg shadow-lg">
            <SupervisorIssue onClose={closeSupervisorIssue} />
            <button
              onClick={closeSupervisorIssue}
              className="mt-4 ml-10 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
