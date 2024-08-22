import React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import ShowMaintenanceMembers from "../../../pages/AdminPages/EquipmentMaintenance/Show_maintenance_members";
import Request from "../../../pages/AdminPages/EquipmentMaintenance/Request/Request";
const data = [
  { label: "Group A", value: 400 },
  { label: "Group B", value: 300 },
  { label: "Group C", value: 300 },
  { label: "Group D", value: 200 },
];

export default function EquipmentCard() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-3">
        <div className="flex items-center justify-center bg-white border h-36 w-96 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="text-6xl">👨‍🔧</div>
            <a href="/ScheduleMaintenanceshow" className="text-center text-teal-500 text-lg font-medium">
              Schedule Maintenance
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white border h-36 w-96 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="text-6xl">⚙️</div>
            <a href="/Issue_Maintaining" className="text-center text-teal-500 text-lg font-medium">
              Issue Maintaining
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white border h-36 w-96 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="text-6xl">📄</div>
            <a href="/Resources" className="text-center text-teal-500 text-lg font-medium">Resource</a>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl">
          <div className="text-teal-500 mb-48 text-lg font-medium">Working Area</div>
          <Stack direction="row" spacing={2} className="relative right-12">
            <PieChart
              series={[
                {
                  paddingAngle: 5,
                  innerRadius: 60,
                  outerRadius: 80,
                  data,
                },
              ]}
              margin={{ right: 5 }}
              width={200}
              height={200}
              legend={{ hidden: true }}
            />
          </Stack>
        </div>
        <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-2">👨‍🔧✉️</div>
            <div className="text-center text-teal-500 text-lg font-medium">
              Technician Request
            </div>
          </div>
        </div>

       <Request />
      </div>
      
      <ShowMaintenanceMembers />
    </div>
  );
}
