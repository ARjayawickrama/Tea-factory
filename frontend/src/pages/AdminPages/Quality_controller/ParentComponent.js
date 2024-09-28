import React, { useState } from 'react';
import QualityCharts from './Quality_Charts'; 

const ParentComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <QualityCharts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default ParentComponent;
