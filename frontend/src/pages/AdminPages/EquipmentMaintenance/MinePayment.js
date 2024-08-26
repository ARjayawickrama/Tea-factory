
import React from 'react'
import Box from "@mui/material/Box";
import { GrHostMaintenance } from "react-icons/gr"; 
export default function MinePayment() {
  return (
    <div className="flex">
    <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
      <div className="flex items-center justify-between p-4">
        <span className="font-semibold">Soba Tea</span>
      </div>
      <nav>
        <ul>
          <li className="p-2 cursor-pointer hover:bg-teal-500 flex items-center">
            <GrHostMaintenance className="w-8 h-8 mr-4" />
            <span>Maintenance</span>
          </li>
        </ul>
      </nav>
    </div>
    <div className="ml-72 p-4 mt-16">
      fgbdfbdxghgghjghgjgjhghghjj
    </div>
  </div>
  )
}
