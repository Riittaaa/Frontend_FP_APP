import { useQuery, useMutation } from "@apollo/client";
import { FETCH_GOODS } from "../../graphql/queries";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import React, { useEffect, useMemo, useState } from "react";
import "./Goods.css";
import { useNavigate } from "react-router-dom";
import { DELETE_GOODS } from "../../graphql/mutations";

function ViewGoods() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_GOODS);
  const [deleteGoods] = useMutation(DELETE_GOODS);

  useEffect(() => {
    if (data && data.goods && data.goods.goods) {
      setRowData(data.goods.goods);
    }
  }, [data]);

  const handleEdit = (goodsId) => {
    navigate(`/editGoods/${goodsId}`);
  };

  const handleDelete = async (goodsId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteGoods({
          variables: {
            id: {
              goodsId: parseInt(goodsId),
            },
          },
        });

        if (response && response.data.deleteGoods.message) {
          setRowData((prevData) =>
            prevData.filter((goods) => goods.id !== goodsId)
          );
          console.log(response.data.deleteGoods.message);
        } else {
          console.log("Error", response.data.deleteGoods.errors);
        }
      } catch (err) {
        console.error("Error deleting goods:", err);
      }
    }
  };

  const ActionCellRenderer = (params) => {
    return (
      <div className="goods__actions">
        <button
          className="goods__action-button goods__action-button--edit"
          onClick={() => handleEdit(params.data.id)}
        >
          Edit
        </button>
        <button
          className="goods__action-button goods__action-button--delete"
          onClick={() => handleDelete(params.data.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      sort: "asc",
      hide: true,
    },
    { field: "name", headerName: "Product Name", flex: 1, sortable: true },
    { field: "soldAs", headerName: "Sold As", flex: 1, sortable: true },
    { field: "unit", headerName: "Unit", flex: 1, sortable: true },
    { field: "category.name", headerName: "Category", flex: 1, sortable: true },
    { field: "availability", headerName: "Available", flex: 1, sortable: true },
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

  const handleAddGoods = () => {
    navigate("/addGoods");
  };

  return (
    <div className="goods">
      <div className="goods__header">
        <h2 className="goods__title">Goods</h2>
        <button className="goods__add-button" onClick={handleAddGoods}>
          + Add Goods
        </button>
      </div>
      <div className="goods__table ag-theme-material-dark">
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

export default ViewGoods;
