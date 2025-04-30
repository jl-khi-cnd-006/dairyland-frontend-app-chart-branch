import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ data, labels }) => {
  // Define state using useState
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
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
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
        //   text: "Vendors",
        },
      },
      yaxis: {
        title: {
        //   text: "Servings",
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
        height={500}
      />
    </div>
  );
};

export default BarChart;
