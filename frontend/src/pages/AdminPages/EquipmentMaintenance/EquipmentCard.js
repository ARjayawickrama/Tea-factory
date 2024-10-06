import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import ShowMaintenanceMembers from "../../../pages/AdminPages/EquipmentMaintenance/Show_maintenance_members";
import Request from "../../../pages/AdminPages/EquipmentMaintenance/Request/Request";
import SupervisorIssue from "../../../pages/AdminPages/EquipmentMaintenance/Request/SupervisorIssue";
import issue from "../../../assets/issue_.png";
import imageSrc from "../../../assets/maintenance.png";
import productivity from "../../../assets/productivity_.png";
import consultation from "../../../assets/consultation.png";
import axios from "axios";
import { Link } from "react-router-dom";
import videoFile from "../../../assets/4.mp4";
import videoFile2 from "../../../assets/2.mp4";
import videoFile3 from "../../../assets/3.mp4";
import videoFile5 from "../../../assets/5.mp4";
import { Tooltip } from "@mui/material";
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
    <div className=" min-h-screen p-2">
      <div className="grid grid-cols-3 gap-6">
        <Tooltip title="Scheduled Maintenance " arrow>
          <div className=" items-center justify-center shadow-md bg-white border h-56 w-96 rounded-xl   transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <Link
              to="/ScheduleMaintenance"
              className="flex flex-col items-center w-full h-full "
            >
              {/* Video Section */}
              <video
                className="w-full h-full object-cover "
                autoPlay
                loop
                muted
              >
                <source src={videoFile2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Text Section */}
            </Link>
          </div>
        </Tooltip>
        <Tooltip title="Issues Meaning  " arrow>
          <div className="flex items-center justify-center shadow-md bg-white border h-56 w-96 rounded-xl  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <Link
              to="/Issue_Maintaining"
              className="flex flex-col items-center w-full h-full"
            >
              {/* Video Section */}
              <video
                className="w-full h-full object-cover "
                autoPlay
                loop
                muted
              >
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Text Section */}
            </Link>
          </div>
        </Tooltip>
        <Tooltip title="Machine Resources  " arrow>
          <div className="flex items-center justify-center  bg-white border h-56 w-96 rounded-xl shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <Link
              to="/Resources"
              className="flex flex-col items-center w-full h-full"
            >
              {/* Video Section */}
              <video
                className="w-full h-full object-cover "
                autoPlay
                loop
                muted
              >
                <source src={videoFile3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Text Section */}
            </Link>
          </div>
        </Tooltip>
        <div className="flex items-center justify-center  bg-white border h-56 w-96 rounded-xl shadow-inner transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
          <div className="w-48 h-48">
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

        {/* Supervisor Issue Card */}
        <Tooltip title="Feedback " arrow>
          <div className="flex items-center justify-center shadow-md  bg-white border h-56 w-96 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
            <div className="flex flex-col items-center">
              {/* Video Section */}

              <div
                className="text-center text-teal-600 text-lg font-semibold cursor-pointer"
                onClick={openSupervisorIssue}
              >
                <video
                  className="w-full h-full object-cover "
                  autoPlay
                  loop
                  muted
                >
                  <source src={videoFile5} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </Tooltip>
        <Request />
      </div>

      <ShowMaintenanceMembers onDataUpdate={handleDataUpdate} />

      {isSupervisorIssueOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-100 shadow-2xl ml-36 z-50  p-6 rounded-lg ">
            <SupervisorIssue onClose={closeSupervisorIssue} />
            <button
              onClick={closeSupervisorIssue}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
