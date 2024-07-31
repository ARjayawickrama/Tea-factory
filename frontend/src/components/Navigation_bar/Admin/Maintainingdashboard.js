import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GrHostMaintenance } from 'react-icons/gr'; // Ensure this import is correct
import AddMaintenanceMembers from '../../../pages/AdminPages/EquipmentMaintenance/Add_Maintenance_members'; 
import EquipmentCard from '../../../pages/AdminPages/EquipmentMaintenance/EquipmentCard'; 
export default function Maintainingdashboard() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex">
            <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
                <div className="flex items-center justify-between p-4">
                    <span className="font-semibold">Soba Tea</span>
                </div>
                <nav>
                    <ul>
                        <li 
                           
                       className="p-2 cursor-pointer hover:bg-teal-500 flex items-center"
                        >
                            <GrHostMaintenance className="w-8 h-8 mr-4" />
                            <span>Maintenance</span>
                        </li>
                     
                    </ul>
                </nav>
            </div>
            <div className="ml-28 p-4 mt-16">
      
<EquipmentCard />
            </div>
        </div>
    );
}
