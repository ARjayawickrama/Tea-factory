import React from 'react';

export default function EquipmentCard() {
  return (
    <div className="grid grid-cols-3 gap-16 p-16">
      <div className="flex items-center justify-center bg-white border h-56 w-72">
        Schedule Maintenance
      </div>
      <div className="flex items-center justify-center bg-white border h-40 w-72">
        Issue Maintaining
      </div>
      <div className="flex items-center justify-center bg-white border h-40 w-72">
        Resource
      </div>
      <div className="flex items-center justify-center bg-white border h-40 w-96">
        Area Chart
      </div>
      <div className="flex flex-col items-center bg-white border p-4 h-40 w-72">
       
      </div>
      <div className="flex items-center justify-center bg-white border h-40">
        P/M Payments
      </div>
      
    </div>
  );
}
