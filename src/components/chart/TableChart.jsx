import React from "react";

const convertTableData = (table, view) => {
  if (!table || !table.data) {
    console.error("Invalid table object:", table);
    return [];
  }

  const { columns, data } = table;
  let parsedData = [];

  try {
    if (!view) {
      // Handle parsed data (when view is false)
      if (data[0].length === columns.length && !isNaN(Number(data[0][0]))) {
        // console.log("Flat numeric data, mapping without parsing");
        parsedData = [
          columns.reduce((acc, col, index) => {
            acc[col] = data[0][index];
            return acc;
          }, {}),
        ];
      } else {
        // Parse and handle complex data
        parsedData = data[0].map((item) => {
          try {
            const parsedItem = JSON.parse(item.replace(/'/g, '"'));
            // console.log("Parsed Item:", parsedItem);

            if (Array.isArray(parsedItem)) {
              // console.log("Data is an array after parsing");
              return columns.reduce((acc, col, index) => {
                acc[col] = parsedItem[index];
                return acc;
              }, {});
            } else if (typeof parsedItem === "object" && parsedItem !== null) {
              // console.log("Data is an object after parsing");
              return parsedItem;
            } else {
              // console.log("Data is flat after parsing", parsedItem);
              return columns.reduce((acc, col, index) => {
                acc[col] = parsedItem[index];
                return acc;
              }, {});
            }
          } catch (error) {
            // console.error("Parsing error:", error);
            return {};
          }
        });
      }
    } else {
      // Handle direct data (flat or nested)
      if (Array.isArray(data[0])) {
        // console.log("Data is nested array");
        // If it's an array of arrays
        parsedData = data.map((row) =>
          columns.reduce((acc, col, index) => {
            acc[col] = row[index];
            return acc;
          }, {})
        );
      } else if (data.length === columns.length) {
        // console.log("Flat data with matching columns length");
        // Handle flat data directly
        parsedData = [
          columns.reduce((acc, col, index) => {
            acc[col] = data[index];
            return acc;
          }, {}),
        ];
      } else {
        // console.warn("Unrecognized data structure:", data);
      }
    }
  } catch (error) {
    // console.log("Parsing error:", error);
  }

  // console.log("Final Parsed Data:", parsedData);
  return parsedData || [];
};

const TableChart = ({ data, view }) => {
  if (!data) return null;

  let tableData = [];

  if (data && view) {
    tableData = convertTableData(data, view);
  } else {
    tableData = convertTableData({
      columns: data.columns,
      data: [data.data],
      view,
    });
  }

  if (tableData.length === 0) {
    return (
      <p className="bg-indigo-200 p-3 rounded-[10px] text-white">
        No relevant data was returned. Please refine your request.
      </p>
    );
  }

  return (
    <div
      className={
        view
          ? " text-gray-900 mt-2 rounded-t-lg min-w-[50%] max-h-[40vh]  overflow-hidden"
          : " max-w-[100%] px-1 mt-2 h-full overflow-auto "
      }
    >
      <div className="overflow-auto max-h-[40vh] rounded-t-lg">
        <table className="min-w-full divide-y rounded-t-lg divide-gray-300 border border-gray-300 bg-[#2e333b7e]">
          <thead className="bg-gray-700 text-white sticky top-0">
            <tr>
              {tableData.length >= 3 && (
                <th className="px-4 py-3 w-[80px] text-left text-sm font-medium uppercase tracking-wider border-b border-e border-gray-300">
                  S No.
                </th>
              )}
              {tableData.length > 0 &&
                Object.keys(tableData[0]).map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider border-b border-e border-gray-300"
                  >
                    {column}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {tableData.map((item, index) => (
              <tr key={index}>
                {/* Show Serial No. only if dataset length is >= 3 */}
                {tableData.length >= 3 && (
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-white border-e border-b border-gray-300">
                    {index + 1}
                  </td>
                )}
                {Object.keys(item).map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 whitespace-nowrap text-sm text-white border-e border-b border-gray-300"
                  >
                    {item[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableChart;
