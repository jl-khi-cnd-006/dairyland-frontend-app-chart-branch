import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const formatNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};

const LineChart = ({ response, isLine }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return formatNumber(val);
        },
      },
      stroke: {
        width: 2,
        curve: "smooth",
        dashArray: 0,
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
        labels: {
          formatter: function (val) {
            return formatNumber(val);
          },
        },
      },
      markers: {
        size: 5,
      },
      legend: {
        show: true,
        position: "top",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatNumber(val);
          },
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

    if (isLine) {
      parsedData = data.map((item) => {
        // console.log('item in bar', item)
        try {
          const parsedItem = JSON.parse(item.replace(/'/g, '"'));
          return parsedItem.map((val) =>
            val === null || val === "None" ? 0 : val
          );
        } catch (error) {
          // console.log("Parsing error:", error, "for item:", item);
          return item;
        }
      });
    } else {
      parsedData = data;
    }
    // console.log("parsed in line", parsedData);

    const isSimpleLine = parsedData.every(
      (item) => typeof item === "number" || typeof item === "string"
    );

    if (isSimpleLine) {
      // Case: one-dimensional array of values
      categories = columns;
      seriesData = parsedData.map(Number);

      setChartState((prevState) => ({
        ...prevState,
        series: [{ name: "Values", data: seriesData }],
        options: {
          ...prevState.options,
          xaxis: { ...prevState.options.xaxis, categories },
        },
      }));
      // console.log("data in line", seriesData);
    } else {
      const categories = parsedData.map((row) => row[0]); // First column = label
      const rawValues = parsedData.map((row) => row.slice(1)); // Remaining = values

      // Step 3: Construct series from columns (excluding first)
      const seriesLabels = columns.slice(1); // Skip "ProductName"

      const transformedSeries = seriesLabels.map((label, i) => ({
        name: label,
        data: rawValues.map((val) => (val[i])),
      }));

      setChartState((prevState) => ({
        ...prevState,
        series: transformedSeries,
        options: {
          ...prevState.options,
          xaxis: { ...prevState.options.xaxis, categories },
        },
      }));

      // console.log('tabular data ', rawValues)
    }
  }, [response, isLine]);

  return (
    <div className="md:m-2 p-1 mt-0">
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
            type="line"
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;