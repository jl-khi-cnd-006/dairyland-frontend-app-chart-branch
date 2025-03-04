import React, { useState } from "react";
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({ data, labels }) => {
  // console.log('data in pir chart',data, labels)
  const integerData = data.map((value) => Math.floor(parseFloat(value)));
  const [pieChartState, setPieChartState] = useState({
    series: integerData,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },

      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "center",
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={pieChartState.options}
        series={pieChartState.series}
        type="pie"
        height={500}
      />
    </div>
  );
};

export default PieChart;
