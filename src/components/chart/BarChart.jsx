import React, { useState } from "react";
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = ({ data, labels }) => {
  const integerData = data.map((value) => value);
  // console.log('data in bar chart',labels)
  const [chartState, setChartState] = useState({
    series: [
      {
        data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      colors: [],
      plotOptions: {
        bar: {
          columnWidth: "50%",
          distributed: true,
          borderRadius: 2,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: data.length > 6 ? false : true,
        offsetY: 0,
        style: {
          colors: ["#000000"],
          fontSize: "12px",
          fontWeight: 600,
          transform: "rotate(45deg)",
          transformOrigin: "20% 40%",
        },
        formatter: (value) => value.toLocaleString(),
      },
      legend: {
        show: true,
        position: 'top'
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            colors: [],
            fontSize: "12px",
            fontWeight: 600,
          },
        },
        title: {
          // text: "Vendors",
        },
      },
      yaxis: {
        title: {
          // text: "Servings",
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default BarChart;
