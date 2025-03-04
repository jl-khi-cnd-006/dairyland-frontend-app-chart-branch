import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BarChart = ({ response }) => {
  console.log("bar chart", response);
  const [minWidth, setMinWidth] = useState("1000px");
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
          borderRadius: 2,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
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
    },
  });

  useEffect(() => {
    if (!response) return;

    const { columns, data } = response;

    // if (!columns || !data || !Array.isArray(data)) return;

    let categories = [];
    let seriesData = [];
    const parsedData = data.map(
      (item) => JSON.parse(item.replace(/'/g, '"')) // Convert single quotes to double quotes for valid JSON
    );

    console.log("parsedData ", parsedData);

    // **Check if `data` consists of single-column values or multiple-column values**
    const isSimpleBar = parsedData.every(
      (item) => typeof item === "string" || typeof item === "number"
    );

    if (isSimpleBar) {
      console.log("in simple form");
      // **Case 1: Simple bar chart (one column, multiple rows)**
      categories = columns;
      seriesData = data.map(Number);
      console.log(categories, seriesData);

      setChartState((prevState) => ({
        ...prevState,
        series: [{ name: "Sales", data: seriesData }],
        options: { ...prevState.options, xaxis: { categories } },
      }));
      setMinWidth(`${Math.max(800, categories.length * 80)}px`);
    } else {
      console.log("in tabular form");
      // **Case 2: Grouped bar chart (multiple rows, multiple columns)**
      const categories = parsedData.map((item) => item[0]); // Extract product names
      const months = columns.slice(1); // Extract months (e.g., "Jul-24", "Aug-24")
      const values = parsedData.map((item) => item.slice(1)); // Extract sales data

      const transformedSeries = months.map((month, i) => ({
        name: month,
        data: values.map((val) => val[i]), // Extract values for each month
      }));

      setChartState((prevState) => ({
        ...prevState,
        series: transformedSeries,
        options: { ...prevState.options, xaxis: { categories } },
      }));
      setMinWidth(
        `${Math.max(1000, categories.length * months.length * 40)}px`
      );
    }
  }, [response]);

  return (
    <div className="md:m-4 p-1">
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
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
