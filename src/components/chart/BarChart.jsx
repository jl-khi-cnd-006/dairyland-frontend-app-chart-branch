import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BarChart = ({ response, isBar }) => {
  console.log("bar chart", response);
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: response?.data?.length <= 5 ? 8 : 2, 
          borderRadiusApplication: "end", 
          dataLabels: {
            position: "top", 
          },
        },
      },
      dataLabels: {
        enabled: response?.data?.length <= 5,
        position: "top", 
        style: {
          fontSize: "12px", // Adjust text size
          colors: ["#000"], // Set text color (adjust if needed)
        },
        offsetY: -20, // Moves labels upwards
        formatter: function (val) {
          return val.toLocaleString(); // Formats numbers with commas (optional)
        },
      },      
      legend: {
        show: true,
        position: "top",
      },
      xaxis: {
        categories: [],
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
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark", // Ensures a deep start
          type: "vertical", // Vertical gradient from bottom to top
          shadeIntensity: 1, // Intensity of the dark shade
          gradientToColors: ["#40E0D0"], // Light Aqua at the top
          inverseColors: true, 
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100], // 0% (bottom) → 100% (top)
        },
      },

    },
  });

  useEffect(() => {
    if (!response || !response.data || !Array.isArray(response.data)) return;

    const { columns, data } = response;

    let categories = [];
    let seriesData = [];
    let parsedData;

    if (isBar) {
      parsedData = data.map(
        (item) => JSON.parse(item.replace(/'/g, '"')) // Convert single quotes to double quotes for valid JSON
      );
    } else {
      parsedData = data;
    }

    console.log("parsedData ", parsedData);

    const isSimpleBar = parsedData.every(
      (item) => typeof item === "string" || typeof item === "number"
    );

    if (isSimpleBar) {
      // console.log("in simple form");
      // **Case 1: Simple bar chart (one column, multiple rows)**
      categories = columns;
      seriesData = data.map(Number);
      // console.log(categories, seriesData);

      setChartState((prevState) => ({
        ...prevState,
        series: [{ name: "Sales", data: seriesData }],
        options: { ...prevState.options, xaxis: { categories } },
      }));
    } else {
      // console.log("in tabular form");
      // **Case 2: Grouped bar chart (multiple rows, multiple columns)**
      const categories = parsedData.map((item) => item[0]);
      const months = columns.slice(1);
      const values = parsedData.map((item) => item.slice(1));

      console.log("cat", categories);

      const transformedSeries = months.map((month, i) => ({
        name: month,
        data: values.map((val) => val[i]),
      }));

      setChartState((prevState) => ({
        ...prevState,
        series: transformedSeries,
        options: { ...prevState.options, xaxis: { categories } },
      }));
    }
  }, [response, isBar]);

  return (
    <div className="md:m-2 p-1 mt-0 ">
      <div style={{ overflowX: "auto", width: "100%", height: "100%" }}>
        <div
          style={{
            minWidth: response?.data?.length
              ? `${response.data.length * 80}px`
              : "auto",
          }}
        >
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
