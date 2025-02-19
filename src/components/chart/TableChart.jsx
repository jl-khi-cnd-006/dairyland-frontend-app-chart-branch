import React from "react";

const convertTableData = (table) => {
  if (!table || !table.data) {
    console.error("Invalid table object:", table);
    return [];
  }

  const { columns, data } = table;

  return data.map((row) => {
    return columns.reduce((acc, col, index) => {
      acc[col] = row[index];
      return acc;
    }, {});
  });
};

const TableChart = ({ data, view }) => {
  // console.log('data in table',data)
  if (!data) return null;

  let tableData = [];

  if (data && view) {
    tableData = convertTableData(data);
  } else {
    tableData = convertTableData({
      columns: data.columns ,
      data: [data.data ],
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
    <div className={view ? " text-gray-900 p-4 rounded-lg min-w-[50%] h-[30vh]  overflow-hidden" : ' max-w-[100%] mt-4 h-full overflow-auto'}>
      <div className="overflow-auto max-h-[40vh] ">
        <table className="min-w-full divide-y divide-gray-300 border border-gray-300 bg-red-400 ">
          <thead className="bg-gray-700 text-white rounded-lg">
            <tr>
              {tableData.length > 0 &&
                Object.keys(tableData[0]).map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b border-e border-indigo-200 bg-white text-black sticky top-0"
                  >
                    {column}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-gray-600 divide-y divide-gray-300">
            {tableData.map((item, index) => (
              <tr key={index}>
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
