import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../../css/Table.css";

const Table = ({ rowData, columnDefs }) => {
  const defaultColDef = {
    flex: 1,
    filter: true,
    sortable: true,
  };
  return (
    <div className="table ag-theme-material-dark">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default Table;
