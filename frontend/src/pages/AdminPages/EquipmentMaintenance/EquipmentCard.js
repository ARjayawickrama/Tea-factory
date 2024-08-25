import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import ShowMaintenanceMembers from "../../../pages/AdminPages/EquipmentMaintenance/Show_maintenance_members";
import Request from "../../../pages/AdminPages/EquipmentMaintenance/Request/Request";
import issue from "../../../assets/issue_.png";
import imageSrc from "../../../assets/maintenance.png";
import SupervisorIssue from "../../../pages/AdminPages/EquipmentMaintenance/Request/SupervisorIssue";
import productivity from "../../../assets/productivity_.png";
import consultation from "../../../assets/consultation.png";

export default function EquipmentCard() {
  const [isSupervisorIssueOpen, setSupervisorIssueOpen] = useState(false);

  const openSupervisorIssue = () => {
    setSupervisorIssueOpen(true);
  };

  const closeSupervisorIssue = () => {
    setSupervisorIssueOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-3">
        <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <div className="flex flex-col items-center">
            <img src={imageSrc} alt="Description" className="w-24 h-24 mb-2" />
            <a
              href="/ScheduleMaintenance"
              className="text-center text-teal-500 text-lg font-medium"
            >
              Schedule Maintenance
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <img src={issue} alt="Description" className="w-24 h-24 mb-2" />
            <a
              href="/Issue_Maintaining"
              className="text-center text-teal-500 text-lg font-medium mt-2"
            >
              Issue Maintaining
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <div className="flex flex-col items-center">
            <img src={productivity} alt="Description" className="w-24 h-24 mb-2" />
            <a
              href="/Resources"
              className="text-center text-teal-500 text-lg font-medium"
            >
              Resource
            </a>
          </div>
        </div>

        <div className="flex borde items-center justify-center bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <div className="text-teal-500 mb-36 ml-7 text-2xl font-medium"></div>
          <div className="text-teal-500 text-lg font-medium "></div>
          <div style={{ width: 200, height: 200, marginRight: 40 }}>
            <Stack direction="row" spacing={2} className="w-full h-full">
              <Gauge
                value={75}
                startAngle={0}
                endAngle={360}
                innerRadius="80%"
                outerRadius="100%"
              />
            </Stack>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
          <div className="flex flex-col items-center">
            <img src={consultation} alt="Description" className="w-24 h-24 mb-2" />
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

      <ShowMaintenanceMembers />

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
