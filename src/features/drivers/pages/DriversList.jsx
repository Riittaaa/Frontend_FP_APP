import React from "react";
import Header from "../../../components/Table/Header";
import { ADD_DRIVER_URL, EDIT_DRIVER_URL } from "../../drivers/consts/routes";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import useFetchDrivers from "../hooks/useFetchDrivers";
import ActionCellRenderer from "../../../components/Table/ActionCellRenderer";
import useDeleteDriver from "../hooks/useDeleteDriver";
import useReactivateDriver from "../hooks/useReactivateDriver";

function DriversList() {
  const navigate = useNavigate();
  const { rowData, loading, error } = useFetchDrivers();

  const handleAddDriver = () => {
    navigate(ADD_DRIVER_URL);
  };

  const handleEdit = (driverId) => {
    navigate(EDIT_DRIVER_URL(driverId));
  };
  const { handleDelete } = useDeleteDriver();

  const { handleReactivate } = useReactivateDriver();

  const columnDefs = [
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
  if (error) return <p>Error loading drivers: {error.message}</p>;

  return (
    <>
      <Header title="Drivers" click={handleAddDriver} />
      <Table rowData={rowData} columnDefs={columnDefs} />
    </>
  );
}

export default DriversList;
