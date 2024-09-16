import React from 'react';

export default function SupplierDetails() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
                <nav>
                    <ul>
                        <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
                            <span>Supplier Manager</span>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <main className="ml-64 p-4 flex-1">
                <h1>Supplier Details Page</h1>
                {/* You can add detailed supplier information here */}
                <p>This is where the supplier details will be displayed.</p>
            </main>
        </div>
    );
}
