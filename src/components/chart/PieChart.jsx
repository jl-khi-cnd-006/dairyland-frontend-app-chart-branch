import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data, labels }) => {
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
          columnWidth: "30%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
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
          text: "Vendors",
        },
      },
      yaxis: {
        title: {
          text: "Servings",
        },
      },
    },
  });
  const [pieChartState, setPieChartState] = useState({
    series: [244, 155],
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
