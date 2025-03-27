import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart = ({ data, labels }) => {
  const integerData = data.map((value) => Math.floor(parseFloat(value)));

  const [pieChartState, setPieChartState] = useState({
    series: integerData,
    options: {
      chart: {
        width: 380,
        type: "pie",
        toolbar: {
          show: true,
        },
      },
      labels: labels,
      legend: {
        position: "right", // Default position
        horizontalAlign: "center",
      },
      responsive: [
        {
          breakpoint: 640, // When width is ≤ 640px
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "top",
              horizontalAlign: "center",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="md:p-[2%]">
      <div id="chart">
        <ReactApexChart
          options={pieChartState.options}
          series={pieChartState.series}
          type="pie"
          height={400}
        />
      </div>
    </div>
  );
};

export default PieChart;
