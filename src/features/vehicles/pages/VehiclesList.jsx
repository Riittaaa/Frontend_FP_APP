import React, { useEffect, useState } from "react";
import useFetchVehicles from "../hooks/useFetchVehicles";
import Header from "../../../components/Table/Header";
import Table from "../../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { ADD_VEHICLE_URL, EDIT_VEHICLE_URL } from "../consts/routes";
import ActionCellRenderer from "../../../components/Table/ActionCellRenderer";
import useDeleteVehicle from "../hooks/useDeleteVehicle";
import useReactivateVehicle from "../hooks/useReactivateVehicle";

export const VehiclesList = () => {
  const navigate = useNavigate();
  const { rowData: fetchedData, loading, error } = useFetchVehicles();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (fetchedData) {
      setRowData(fetchedData);
    }
  }, [fetchedData]);

  const handleAddVehicle = () => {
    navigate(ADD_VEHICLE_URL);
  };

  const handleEdit = (vehicleId) => {
    navigate(EDIT_VEHICLE_URL(vehicleId));
  };
  const { handleDelete } = useDeleteVehicle();

  const { handleReactivate } = useReactivateVehicle();

  const columnDefs = [
    { field: "id", headerName: "ID", hide: true, sort: "asc" },
    {
      field: "licensePlate",
      headerName: "License Plate",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "vehicleType",
      headerName: "Type",
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
      cellRenderer: (params) => (
        <ActionCellRenderer
          data={params.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReactivate={handleReactivate}
        />
      ),
      filter: false,
      sortable: false,
      minWidth: 150,
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading vehicles: {error.message}</p>;

  return (
    <div>
      <Header title="Vehicles" click={handleAddVehicle} />
      <Table rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default VehiclesList;
