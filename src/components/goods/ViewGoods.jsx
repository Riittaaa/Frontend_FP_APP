import { useQuery } from "@apollo/client";
import { FETCH_GOODS } from "../../graphql/queries";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import React, { useEffect, useMemo, useState } from "react";
import "./Goods.css";
import { useNavigate } from "react-router-dom";

function ViewGoods() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_GOODS);

  useEffect(() => {
    if (data && data.goods && data.goods.goods) {
      setRowData(data.goods.goods);
    }
  }, [data]);

  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "ID", sortable: true, sort: "asc" },
    { field: "name", headerName: "Product Name", flex: 1, sortable: true },
    { field: "soldAs", headerName: "Sold As", flex: 1, sortable: true },
    { field: "unit", headerName: "Unit", flex: 1, sortable: true },
    { field: "category", headerName: "Category", flex: 1, sortable: true },
    { field: "availability", headerName: "Available", flex: 1, sortable: true },
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
      <div className="goods__heading">
        <h2 className="goods__heading-title">Goods</h2>
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
