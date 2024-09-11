import React, { useMemo, useState, useEffect } from "react";
import "./Vehicles.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_VEHICLES } from "../../graphql/queries";
import { DELETE_VEHICLE } from "../../graphql/mutations";

function ViewVehicles() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_VEHICLES);
  const [deleteVehicle] = useMutation(DELETE_VEHICLE);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (data && data.vehicles && data.vehicles.vehicle) {
      setRowData(data.vehicles.vehicle);
    }
  }, [data]);

  const handleAddVehicle = () => {
    navigate("/addVehicle");
  };

  const handleEdit = (vehicleId) => {
    navigate(`/editVehicle/${vehicleId}`);
  };

  const handleDelete = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const response = await deleteVehicle({
          variables: {
            deleteVehicleInput: {
              vehicleId: parseInt(vehicleId),
            },
          },
        });

        if (response && response.data.deleteVehicle.message) {
          setRowData((prevData) =>
            prevData.filter((vehicle) => vehicle.id !== vehicleId)
          );
          console.log(response.data.deleteVehicle.message);
        } else {
          console.log("Error", response.data.deleteVehicle.errors);
        }
      } catch (err) {
        console.error("Error deleting vehicle:", err);
      }
    }
  };

  const ActionCellRenderer = (params) => {
    return (
      <div className="actions-cell">
        <button
          className="edit-button"
          onClick={() => handleEdit(params.data.id)}
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => handleDelete(params.data.id)} // Ensure params.data.id is correct
        >
          Delete
        </button>
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "Id", flex: 1, sortable: true },
    { field: "brand", headerName: "Brand", flex: 1, sortable: true },
    { field: "capacity", headerName: "Capacity", flex: 1, sortable: true },
    { field: "groupId", headerName: "Group Id", flex: 1, sortable: true },
    {
      field: "licensePlate",
      headerName: "License Plate",
      flex: 1,
      sortable: true,
    },
    { field: "status", headerName: "Status", flex: 1, sortable: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionCellRenderer,
      filter: false,
      sortable: false,
      width: 150,
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
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="ag-vehicles">
      <div className="ag-heading">
        <h2>Vehicles</h2>
        <button className="add-vehicle" onClick={handleAddVehicle}>
          + Add Vehicle
        </button>
      </div>

      <div
        className="table ag-theme-material-dark"
        style={{ height: "calc(100vh - 100px)", width: "100%" }}
      >
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

export default ViewVehicles;
