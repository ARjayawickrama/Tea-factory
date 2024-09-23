import * as React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

const sample = [1, 10, 30, 50, 70, 90, 100];

export default function ScaleExample() {
  const showLogAxis = sample.some(value => value > 10); // Condition example

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <LineChart
        xAxis={[{ data: sample }]}
        yAxis={[
          { id: 'linearAxis', scaleType: 'linear', label: 'Linear Axis' },
          showLogAxis ? { id: 'logAxis', scaleType: 'log', label: 'Log Axis' } : null,
        ].filter(Boolean)}
        series={[
          { yAxisId: 'linearAxis', data: sample, label: 'Linear Data' },
          showLogAxis ? { yAxisId: 'logAxis', data: sample, label: 'Log Data' } : null,
        ].filter(Boolean)}
        leftAxis="linearAxis"
        rightAxis={showLogAxis ? 'logAxis' : undefined}
        height={400}
      />
    </Box>
  );
}
