import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Modal from "react-modal";
import "./Orders.css";
import "./Modal.css";
import { FETCH_ORDERGROUPS } from "../../graphql/queries";

Modal.setAppElement("#root");

function OrderLists() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const { data, loading, error } = useQuery(FETCH_ORDERGROUPS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: "",
    createdAt: "",
    plannedAt: "",
    recurring: false,
    recurrenceFrequency: "",
    recurrenceEndDate: "",
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    customerBranch: {
      id: "",
      branchLocation: "",
    },
    deliveryOrder: {
      lineItems: [],
      driver: {
        id: "",
        name: "",
      },
      vehicle: {
        id: "",
        brand: "",
      },
      status: "",
    },
  });

  useEffect(() => {
    if (data && data.allOrderGroup) {
      setRowData(data.allOrderGroup);
      setFilteredData(data.allOrderGroup);
    }
  }, [data]);

  const handleSearch = (e) => {
    const inputDate = e.target.value;
    setSearchDate(inputDate);

    // Filter orders based on the plannedAt date
    const filteredOrders = rowData.filter((order) => {
      const orderDate = new Date(order.order.plannedAt)
        .toISOString()
        .split("T")[0];
      return orderDate === inputDate;
    });

    setFilteredData(filteredOrders);
  };

  const ActionCellRenderer = (params) => {
    return (
      <div className="orders__actions">
        <button
          className="orders__action-button orders__action-button--edit"
          onClick={() => handleEdit(params.data.order.id)}
        >
          Edit
        </button>

        <button
          className="orders__action-button orders__action-button--details"
          onClick={() => handleDetails(params.data.order)}
        >
          Details
        </button>
      </div>
    );
  };

  const handleAddOrder = () => {
    navigate("/addOrder");
  };

  const handleEdit = (orderId) => {
    navigate(`/editOrder/${orderId}`);
  };

  const handleDetails = (order) => {
    setModalData(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      sortable: true,
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div className="orders">
      <div className="orders__header">
        <h2>Order Groups</h2>
        <div className="filter">
          <label htmlFor="search">Search by date: </label>
          <input
            type="date"
            value={searchDate}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <button className="orders__add-button" onClick={handleAddOrder}>
          + Add Order
        </button>
      </div>

      <div className="orders__table ag-theme-material-dark">
        <AgGridReact
          rowData={filteredData}
          columnDefs={[
            {
              field: "order.id",
              headerName: "ID",
              hide: true,
              sortable: true,
              sort: "asc",
            },
            {
              field: "order.customer.name",
              headerName: "Customer Name",
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
              field: "order.customerBranch.branchLocation",
              headerName: "Ship To",
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
              headerName: "Actions",
              field: "actions",
              cellRenderer: ActionCellRenderer,
              filter: false,
              sortable: false,
              minWidth: 150,
            },
          ]}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Order Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div>
          <h2>Order Details</h2>
          <div className="order-details-row">
            <div className="order-details-group">
              <label className="order-form__label">Order ID</label>
              <input
                type="text"
                value={modalData.id}
                className="order-form__input"
                readOnly
              />
            </div>
            <div className="order-details-group">
              <label className="order-form__label">Created at</label>
              <input
                type="text"
                value={modalData.createdAt}
                className="order-form__input"
                readOnly
              />
            </div>
            <div className="order-details-group">
              <label className="order-form__label">Status</label>
              <input
                type="text"
                value={modalData.deliveryOrder.status}
                className="order-form__input"
                readOnly
              />
            </div>
            <div className="order-details-group">
              <label className="order-form__label">Planned at</label>
              <input
                type="text"
                value={modalData.plannedAt}
                className="order-form__input"
                readOnly
              />
            </div>
          </div>

          {modalData.parentOrderGroupId && (
            <>
              <h4>Parent Order</h4>
              <div className="table-container">
                <table className="parent-details-table">
                  <thead>
                    <tr>
                      <th>Parent Order ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{modalData.parentOrderGroupId}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="table-container">
            <table className="customer-details-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{modalData.customer.name}</td>
                  <td>{modalData.customer.email}</td>
                  <td>{modalData.customer.phone}</td>
                </tr>
              </tbody>
            </table>

            <table className="customer-branch-table">
              <thead>
                <tr>
                  <th>Branch Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{modalData.customerBranch.branchLocation}</td>
                </tr>
              </tbody>
            </table>

            <table className="drivers-details-table">
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Vehicle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{modalData.deliveryOrder.driver?.name || "nil"}</td>
                  <td>{modalData.deliveryOrder.vehicle?.brand}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {modalData.recurring && (
            <>
              <h4>Recurring Details</h4>
              <div className="table-container">
                <table className="recurring-details-table">
                  <thead>
                    <tr>
                      <th>Recurrence Frequency</th>
                      <th>Recurrence End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{modalData.recurrenceFrequency}</td>
                      <td>{modalData.recurrenceEndDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {modalData.childOrderGroups &&
            modalData.childOrderGroups.length > 0 && (
              <>
                <h4>Child Orders</h4>
                <div className="table-container">
                  <table className="child-orders-table">
                    <thead>
                      <tr>
                        <th>Child Order ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalData.childOrderGroups.map((childOrder) => (
                        <tr key={childOrder.id}>
                          <td>{childOrder.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

          <h4>Line Items</h4>
          <div className="table-container">
            <table className="lineOrders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Goods</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {modalData.deliveryOrder.lineItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.goods.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button onClick={closeModal} className="close-modal-button">
          Close
        </button>
      </Modal>
    </div>
  );
}

export default OrderLists;
