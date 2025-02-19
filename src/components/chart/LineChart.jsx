import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LineChart = ({ }) => {
    const data = [10, 20, 30, 40, 50];
    const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Series 1",
        data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      colors: ["#008FFB"],
      dataLabels: {
        enabled: data.length > 6 ? false : true,
        formatter: (value) => value.toLocaleString(),
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        title: {
          text: "Values",
        },
      },
      markers: {
        size: 5,
      },
      legend: {
        show: true,
        position: "top",
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default LineChart;
