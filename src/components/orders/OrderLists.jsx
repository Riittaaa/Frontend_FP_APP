import React, { useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useNavigate } from "react-router-dom";
import { FETCH_ORDERGROUPS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

function OrderLists() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const { data, loading, error } = useQuery(FETCH_ORDERGROUPS);

  useEffect(() => {
    if (data && data.allOrderGroup) {
      setRowData(data.allOrderGroup);
    }
  }, [data]);

  const ActionCellRenderer = (params) => {
    return (
      <>
        <div className="orders__actions">
          <button
            className="orders__action-button orders__action-button--edit"
            onClick={() => handleCreateDelivery(params.data.order.id)}
          >
            Create Delivery Order
          </button>
        </div>
      </>
    );
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "order.id",
      headerName: "ID",
      hide: true,
      sortable: true,
      sort: "asc",
    },
    {
      field: "order.createdAt",
      headerName: "Created At",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "order.recurring",
      headerName: "Recurring",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "order.plannedAt",
      headerName: "Planned At",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "order.customer.name",
      headerName: "Customer Name",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      field: "order.lineItems[{0}]",
      headerName: "line Name",
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

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "id", headerName: "Line Item ID" },
          { field: "goodsId", headerName: "Goods ID" },
          { field: "quantity", headerName: "Quantity" },
        ],
        defaultColDef: {
          flex: 1,
          filter: true,
          sortable: true,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.lineItems);
      },
    };
  }, []);

  const handleAddOrder = () => {
    navigate("/addOrder");
  };

  const handleCreateDelivery = (orderId) => {
    navigate(`/addDelivery/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div className="orders">
      <div className="orders__header">
        <h2>Order Groups</h2>
        <button className="orders__add-button" onClick={handleAddOrder}>
          + Add Order
        </button>
      </div>

      <div className="orders__table ag-theme-material-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default OrderLists;
