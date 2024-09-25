import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FETCH_CUSTOMERS, EXPORT_CSV } from "../../graphql/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import "./Customers.css";
import { DELETE_CUSTOMER } from "../../graphql/mutations";

function ViewCustomers() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_CUSTOMERS);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const [exportCSV] = useLazyQuery(EXPORT_CSV);

  useEffect(() => {
    if (data && data.allCustomers) {
      setRowData(data.allCustomers);
    }
  }, [data]);

  const handleEdit = (customerId) => {
    navigate(`/editCustomer/${customerId}`);
  };

  const handleDelete = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await deleteCustomer({
          variables: {
            deleteCustomer: {
              customerId: parseInt(customerId),
            },
          },
        });

        if (response && response.data.deleteCustomer.message) {
          setRowData((prevData) =>
            prevData.filter((customer) => customer.id !== customerId)
          );
          console.log(response.data.deleteCustomer.message);
        } else {
          console.log("Error", response.data.deleteCustomer.errors);
        }
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
  };

  const handleExport = async (customerId) => {
    try {
      const response = await exportCSV({ variables: { id: customerId } });
      const csvUrl = response.data.csvExport;

      window.open(
        `https://b89d-2400-1a00-b060-748f-5ece-3a95-272a-7a49.ngrok-free.app${csvUrl}`,
        "_blank"
      );
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const ActionCellRenderer = (params) => {
    return (
      <div className="customers__actions">
        <button
          className="customers__action-button customers__action-button--edit"
          onClick={() => handleEdit(params.data.id)}
        >
          Edit
        </button>

        <button
          className="customers__action-button customers__action-button--delete"
          onClick={() => handleDelete(params.data.id)}
        >
          Delete
        </button>

        <button
          className="customers__action-button customers__action-button--exportcsv"
          onClick={() => handleExport(params.data.id)}
        >
          Export CSV
        </button>
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "ID", hide: true, sortable: true, sort: "asc" },
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionCellRenderer,
      filter: false,
      sortable: false,
      minWidth: 150,
    },
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

  const handleRowClick = (params) => {
    const customerId = params.data.id;
    navigate(`/customers/${customerId}/branches`);
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
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
}

export default ViewCustomers;
