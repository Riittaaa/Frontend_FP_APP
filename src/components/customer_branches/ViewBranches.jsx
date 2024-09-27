import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { FETCH_BRANCHES } from "../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE_BRANCH } from "../../graphql/mutations";
import { toast } from "react-toastify";

function ViewBranches() {
  const { customerId } = useParams();
  //   console.log(customerId);
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_BRANCHES, {
    variables: {
      customerId: parseInt(customerId),
    },
  });

  const [deleteBranch] = useMutation(DELETE_BRANCH);

  useEffect(() => {
    if (data && data.allBranches) {
      setRowData(data.allBranches);
    }
  }, [data]);

  const handleEdit = (customerbranchId) => {
    navigate(`${customerbranchId}/editBranch`);
  };

  const handleDelete = async (customerbranchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        const response = await deleteBranch({
          variables: {
            input: {
              customerbranchId: parseInt(customerbranchId),
            },
          },
        });

        if (response && response.data.deleteCustomerbranch.message) {
          setRowData((prevData) =>
            prevData.filter(
              (customerbranch) => customerbranch.id !== customerbranchId
            )
          );
          toast.success("Customer branch deleted successfully!!");
        } else {
          toast.error("Error", response.data.deleteCustomerbranch.errors);
        }
      } catch (err) {
        toast.error("Error deleting branch:", err);
      }
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
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "ID", hide: true, sortable: true, sort: "asc" },
    {
      field: "branchLocation",
      headerName: "Branch Location",
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

  const handleAddBranch = () => {
    navigate(`/customers/${customerId}/addBranch`);
  };

  return (
    <div className="customers">
      <div className="customers__header">
        <h2>Customer Branches</h2>
        <button className="customers__add-button" onClick={handleAddBranch}>
          + Add Branch
        </button>
      </div>

      <div className="customers__table ag-theme-material-dark">
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

export default ViewBranches;
