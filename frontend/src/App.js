import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Equipment from './pages/Userpages/Equipment';

import EquipmentForm from './components/EquipmentMaintenance/EquipmentForm';
import EquipmentDisplay from './components/EquipmentMaintenance/EquipmentDisplay';
import EquipmentUpdate from './components/EquipmentMaintenance/EquipmentUpdate';

function App() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<Equipment />} />
                <Route path="/equipmentform" element={<EquipmentForm />} />
                <Route path="/EquipmentDisplay" element={<EquipmentDisplay />} />
                <Route path="/EquipmentUpdate/:id" element={<EquipmentUpdate />} />
              
              
            </Routes>
        </Router>
    );
}

export default App;
