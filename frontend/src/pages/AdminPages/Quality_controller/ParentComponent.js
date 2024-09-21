import React, { useState } from 'react';
import QualityCharts from './Quality_Charts'; // Adjust the path as needed

const ParentComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <QualityCharts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default ParentComponent;
