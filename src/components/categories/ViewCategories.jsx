import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import React, { useEffect, useMemo, useState } from "react";
import { FETCH_CATEGORIES } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_CATEGORY } from "../../graphql/mutations";
import { toast } from "react-toastify";
import "./Categories.css";

function ViewCategories() {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_CATEGORIES);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    if (data && data.allCategory.category) {
      setRowData(data.allCategory.category);
    }
  }, [data]);

  const handleEdit = (categoryId) => {
    navigate(`/editCategory/${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await deleteCategory({
          variables: {
            input: {
              id: categoryId,
            },
          },
        });

        if (response && response.data.deleteCategory.message) {
          setRowData((prevData) =>
            prevData.filter((category) => category.id !== categoryId)
          );
          toast.success("Category deleted successfully!!");
        } else {
          toast.error("Error" + response.data.deleteCategory.errors);
        }
      } catch (err) {
        toast.error("Error deleting category:", err);
      }
    }
  };

  const ActionCellRenderer = (params) => {
    return (
      <div className="categories__actions">
        <button
          className="categories__action-button categories__action-button--edit"
          onClick={() => handleEdit(params.data.id)}
        >
          Edit
        </button>

        <button
          className="categories__action-button categories__action-button--delete"
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
      headerName: "Customer",
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

  const handleAddCategory = () => {
    navigate("/addCategory");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className="categories">
      <div className="customers__header">
        <h2>Categories</h2>
        <button className="customers__add-button" onClick={handleAddCategory}>
          + Add Category
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

export default ViewCategories;
