import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FETCH_DRIVERS } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import "./Drivers.css";
import { DELETE_DRIVER } from "../../graphql/mutations";

function ViewDrivers() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_DRIVERS, {
    variables: {
      groupId: 1,
    },
  });
  const [deleteDriver] = useMutation(DELETE_DRIVER);

  useEffect(() => {
    if (data && data.alldrivers) {
      setRowData(data.alldrivers);
    }
  }, [data]);

  const handleAddDriver = () => {
    navigate("/addDriver");
  };

  const handleEdit = (driverId) => {
    navigate(`/editDriver/${driverId}`);
  };

  const handleDelete = async (driverId) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        const response = await deleteDriver({
          variables: {
            input: {
              driverId,
            },
          },
        });

        if (response && response.data.deleteDriver.message) {
          setRowData((prevData) =>
            prevData.filter((driver) => driver.id !== driverId)
          );
          console.log(response.data.deleteDriver.message);
        } else {
          console.log("Error", response.data.deleteDriver.errors);
        }
      } catch (err) {
        console.error("Error deleting driver:", err);
      }
    }
  };

  const ActionCellRenderer = (params) => {
    return (
      <div className="driver__actions">
        <button
          className="driver__action-button driver__action-button--edit"
          onClick={() => handleEdit(params.data.id)}
        >
          Edit
        </button>

        <button
          className="driver__action-button driver__action-button--delete"
          onClick={() => handleDelete(params.data.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "ID", hide: true, sortable: true, sort: "asc" },
    {
      field: "name",
      headerName: "Driver Name",
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
      field: "phoneNo",
      headerName: "Phone",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
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
  if (error) return <p>Error loading drivers: {error.message}</p>;

  return (
    <div className="drivers">
      <div className="drivers__header">
        <h2>Drivers</h2>
        <button className="drivers__add-button" onClick={handleAddDriver}>
          + Add Driver
        </button>
      </div>

      <div className="drivers__table ag-theme-material-dark">
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

export default ViewDrivers;
