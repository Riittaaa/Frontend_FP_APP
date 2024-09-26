import React, { useState, useEffect } from "react";
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
      driverId: "",
      vehicleId: "",
      status: "",
    },
  });

  useEffect(() => {
    if (data && data.allOrderGroup) {
      setRowData(data.allOrderGroup);
    }
  }, [data]);

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
          onClick={() => handleDetails(params.data.order)} // Pass entire order object
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
          defaultColDef={{ flex: 1, filter: true, sortable: true }}
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
              <label className="order-form__label">Planned at</label>
              <input
                type="text"
                value={modalData.plannedAt}
                className="order-form__input"
                readOnly
              />
            </div>
          </div>

          <div className="table-container">
            {/* <h4>Customer Details</h4> */}
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

            {/* <h4>Delivery Order Details</h4> */}
            <table className="customer-details-table">
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Vehicle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {modalData.deliveryOrder.driverId}</td>
                  <td>{modalData.deliveryOrder.vehicleId}</td>
                </tr>
              </tbody>
            </table>
            {/* <p>Driver ID: {modalData.deliveryOrder.driverId}</p>
          <p>Vehicle ID: {modalData.deliveryOrder.vehicleId}</p> */}
          </div>

          {modalData.recurring && (
            <>
              <h4>Recurring Details</h4>
              <div className="table-container">
                <table className="customer-details-table">
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
              {/* <p>Frequency: {modalData.recurrenceFrequency}</p>
              <p>End Date: {modalData.recurrenceEndDate}</p> */}
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
                    <td>{item.goodsId}</td>
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
