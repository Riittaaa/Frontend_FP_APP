import React from "react";
import Header from "../../../components/Table/Header";
import Table from "../../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { ADD_CUSTOMER_URL, EDIT_CUSTOMER_URL } from "../consts/routes";
import ActionCellRenderer from "../components/ActionCellRenderer";
import useDeleteCustomer from "../hooks/useDeleteCustomer";
import useReactivateCustomer from "../hooks/useReactivateCustomer";
import useExportCSV from "../hooks/useExportCSV";
import useFetchCustomers from "../hooks/useFetchCustomers";

function CustomersList() {
  const navigate = useNavigate();

  const { rowData, loading, error } = useFetchCustomers();

  const handleAddCustomer = () => {
    navigate(ADD_CUSTOMER_URL);
  };

  const handleEdit = (customerId) => {
    navigate(EDIT_CUSTOMER_URL(customerId));
  };
  const { handleDelete } = useDeleteCustomer();

  const { handleReactivate } = useReactivateCustomer();

  const { handleExport } = useExportCSV();

  const handleRowClick = (params) => {
    const customerId = params.data.id;
    navigate(`/customers/${customerId}/branches`);
  };

  const columnDefs = [
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
      cellRenderer: (params) => (
        <ActionCellRenderer
          data={params.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReactivate={handleReactivate}
          onExport={handleExport}
        />
      ),
      filter: false,
      sortable: false,
      minWidth: 250,
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading customers: {error.message}</p>;

  return (
    <>
      <Header title="Customers" click={handleAddCustomer} />
      <Table
        rowData={rowData}
        columnDefs={columnDefs}
        onRowClicked={handleRowClick}
      />
    </>
  );
}

export default CustomersList;
