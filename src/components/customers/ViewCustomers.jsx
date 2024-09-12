import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FETCH_CUSTOMERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import "./Customers.css";

function ViewCustomers() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_CUSTOMERS);

  useEffect(() => {
    if (data && data.allCustomers) {
      setRowData(data.allCustomers);
    }
  }, [data]);

  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "ID", hide: true, sortable: true, sort: "asc" },
    { field: "name", headerName: "Customer Name", flex: 1, sortable: true },
    { field: "email", headerName: "Email", flex: 1, sortable: true },
    { field: "address", headerName: "Address", flex: 1, sortable: true },
    { field: "phone", headerName: "Phone", flex: 1, sortable: true },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      sortable: true,
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading customers: {error.message}</p>;

  const handleAddCustomer = () => {
    navigate("/addCustomer");
  };
  return (
    <div className="customers">
      <div className="customers__header">
        <h2>Customers</h2>
        <button className="customers__add-button" onClick={handleAddCustomer}>
          + Add Customer
        </button>
      </div>

      <div className="customers__table ag-theme-material-dark">
        {" "}
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default ViewCustomers;
