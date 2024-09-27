import React, { useState } from "react";
import "./Orders.css";
import {
  FETCH_BRANCHES,
  FETCH_CUSTOMERS,
  FETCH_DRIVERS,
  FETCH_GOODS,
  FETCH_RECURRING_FREQUENCIES,
  FETCH_UNITS,
  FETCH_VEHICLES,
} from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDERGROUP } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddOrder() {
  const navigate = useNavigate();
  const [plannedAt, setPlannedAt] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerBranch, setCustomerBranch] = useState("");
  const [goodsList, setGoodsList] = useState([
    { goods: "", quantity: "", unit: "", destroy: false },
  ]);
  const [recurring, setRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState(null);
  // const [nextDueDate, setNextDueDate] = useState("");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(null);

  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");
  // const [status, setStatus] = useState("");
  // const [dispatchedDate, setDispatchedDate] = useState("");
  // const [deliveryDate, setDeliveryDate] = useState("");

  const {
    data: allCustomersData,
    loading: customersLoading,
    error: customersError,
  } = useQuery(FETCH_CUSTOMERS);

  const {
    data: allCustomerBranches,
    loading: customerBranchesLoading,
    error: customerBranchesError,
    refetch: refetchBranches,
  } = useQuery(FETCH_BRANCHES, {
    variables: { customerId: customer },
    skip: !customer,
  });

  const {
    data: frequenciesData,
    loading: frequenciesLoading,
    error: frequenciesError,
  } = useQuery(FETCH_RECURRING_FREQUENCIES);

  const {
    data: allGoodsData,
    loading: allGoodsLoading,
    error: goodsError,
  } = useQuery(FETCH_GOODS);

  const {
    data: unitsData,
    loading: unitsLoading,
    error: unitsError,
  } = useQuery(FETCH_UNITS);

  const {
    data: allDriversData,
    loading: driversLoading,
    error: driversError,
  } = useQuery(FETCH_DRIVERS);

  const {
    data: allVehiclesData,
    loading: vehiclesLoading,
    error: vehiclesError,
  } = useQuery(FETCH_VEHICLES);

  // const {
  //   data: statusData,
  //   loading: statusLoading,
  //   error: statusError,
  // } = useQuery(FETCH_DELIVERY_STATUSES);

  const [createOrderGroup, { loading, error }] = useMutation(CREATE_ORDERGROUP);

  const handleGoodsChange = (index, event) => {
    const { name, value } = event.target;
    const newGoodsList = [...goodsList];
    newGoodsList[index][name] = value;
    setGoodsList(newGoodsList);
  };

  const handleAddGoods = () => {
    setGoodsList([...goodsList, { goods: "", quantity: "", unit: "" }]);
  };

  const handleDeleteGoods = (index) => {
    const newGoodsList = goodsList.filter((_, i) => i !== index);
    setGoodsList(newGoodsList);
  };

  const handleCustomerChange = (e) => {
    const selectedCustomer = e.target.value;
    setCustomer(selectedCustomer);
    setCustomerBranch("");
    if (selectedCustomer) {
      refetchBranches({ customerId: selectedCustomer });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createOrderGroup({
        variables: {
          groupOrder: {
            createOrder: {
              plannedAt,
              customerBranchId: parseInt(customerBranch),
              recurring,
              recurrenceFrequency,
              // nextDueDate,
              recurrenceEndDate,
              deliveryOrderAttributes: {
                driverId: parseInt(driver),
                vehicleId: parseInt(vehicle),
                // status: "PENDING",
                // dispatchedDate,
                // deliveryDate,
                linedItemsAttributes: goodsList.map((item) => ({
                  goodsId: parseInt(item.goods),
                  quantity: parseInt(item.quantity),
                  unit: item.unit,
                })),
              },
            },
          },
        },
      });

      if (data.createOrderGroup.message) {
        toast.success("Order created successfully!!");
        navigate("/dashboard");
      } else {
        toast.error("Error:", data.createOrderGroup.errors);
      }
    } catch (err) {
      toast.error("Error adding order group:", err);
    }
  };

  return (
    <div className="container">
      <div className="order-form">
        <h3 className="order-form__title">Add Order</h3>
        <form className="order-form__container" onSubmit={handleSubmit}>
          <div className="order-form__row">
            <div className="order-form__group">
              <label htmlFor="plannedAt" className="order-form__label">
                Planned at
              </label>
              <input
                type="date"
                id="plannedAt"
                name="plannedAt"
                value={plannedAt}
                onChange={(e) => setPlannedAt(e.target.value)}
                className="order-form__input"
                required
              />
            </div>

            <div className="order-form__group">
              <label htmlFor="customer" className="order-form__label">
                Select Customer
              </label>
              <select
                id="customer"
                name="customer"
                value={customer}
                onChange={handleCustomerChange}
                className="order-form__select"
                required
              >
                <option value="">Select customer</option>
                {customersLoading ? (
                  <option>Loading...</option>
                ) : customersError ? (
                  <option>Error loading customers</option>
                ) : (
                  allCustomersData?.allCustomers?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))
                )}
                {customersError && (
                  <p className="customer__error">{customersError.message}</p>
                )}
              </select>
            </div>

            <div className="order-form__group">
              <label htmlFor="customerBranch" className="order-form__label">
                Select Customer Branch
              </label>
              <select
                id="customerBranch"
                name="customerBranch"
                value={customerBranch}
                onChange={(e) => setCustomerBranch(e.target.value)}
                className="order-form__select"
                required
              >
                <option value="">Select customer branch</option>
                {customerBranchesLoading ? (
                  <option>Loading...</option>
                ) : customerBranchesError ? (
                  <option>Error fetching customer branches</option>
                ) : (
                  allCustomerBranches?.allBranches?.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branchLocation}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="order-form__group">
            <label htmlFor="recurring" className="order-form__label">
              Recurring
            </label>
            <input
              type="checkbox"
              id="recurring"
              name="recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="order-form__input-checkbox"
            />
          </div>
          {recurring && (
            <div className="order-form__row">
              <div className="order-form__group">
                <label
                  htmlFor="recurrenceFrequency"
                  className="order-form__label"
                >
                  Recurrence Frequency
                </label>
                <select
                  id="recurrenceFrequency"
                  name="recurrenceFrequency"
                  value={recurrenceFrequency}
                  onChange={(e) => setRecurrenceFrequency(e.target.value)}
                  className="order-form__select"
                  required
                >
                  <option value="">Select Recurrence Frequency</option>
                  {frequenciesLoading ? (
                    <option>Loading...</option>
                  ) : frequenciesError ? (
                    <option>Error loading frequencies</option>
                  ) : (
                    frequenciesData?.frequency?.map((frequency) => (
                      <option key={frequency} value={frequency}>
                        {frequency}
                      </option>
                    ))
                  )}
                </select>
              </div>
              {/* <div className="order-form__group">
                <label htmlFor="nextDueDate" className="order-form__label">
                  Next Due Date
                </label>
                <input
                  type="date"
                  id="nextDueDate"
                  name="nextDueDate"
                  value={nextDueDate}
                  onChange={(e) => setNextDueDate(e.target.value)}
                  className="order-form__input"
                  required
                />
              </div> */}
              <div className="order-form__group">
                <label
                  htmlFor="recurrenceEndDate"
                  className="order-form__label"
                >
                  Recurrence End Date
                </label>
                <input
                  type="date"
                  id="recurrenceEndDate"
                  name="recurrenceEndDate"
                  value={recurrenceEndDate}
                  onChange={(e) => setRecurrenceEndDate(e.target.value)}
                  className="order-form__input"
                  required
                />
              </div>
            </div>
          )}
          {goodsList.map((goodsItem, index) => (
            <div key={index} className="order-form__row">
              <div className="order-form__group">
                <label htmlFor="goods" className="order-form__label">
                  Select Goods
                </label>
                <select
                  id={`goods-${index}`}
                  name="goods"
                  value={goodsItem.goods}
                  onChange={(e) => handleGoodsChange(index, e)}
                  className="order-form__select"
                  required
                >
                  <option value="">Select goods</option>
                  {allGoodsLoading ? (
                    <option>Loading...</option>
                  ) : goodsError ? (
                    <option>Error loading goods</option>
                  ) : (
                    allGoodsData?.goods?.goods?.map((goods) => (
                      <option key={goods.id} value={goods.id}>
                        {goods.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="order-form__group">
                <label htmlFor="quantity" className="order-form__label">
                  Quantity
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  name="quantity"
                  value={goodsItem.quantity}
                  onChange={(e) => handleGoodsChange(index, e)}
                  className="order-form__input"
                  required
                />
              </div>

              <div className="order-form__group">
                <label htmlFor="unit" className="order-form__label">
                  Unit
                </label>
                <select
                  id={`unit-${index}`}
                  name="unit"
                  value={goodsItem.unit}
                  onChange={(e) => handleGoodsChange(index, e)}
                  className="order-form__select"
                  required
                >
                  <option value="">Select unit</option>
                  {unitsLoading ? (
                    <option>Loading...</option>
                  ) : unitsError ? (
                    <option>Error loading units</option>
                  ) : (
                    unitsData?.unit?.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {index > 0 && (
                <div className="order-form__group order-form__group--delete">
                  <button
                    type="button"
                    onClick={() => handleDeleteGoods(index)}
                    className="order-form__button order__button--delete-goods"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="buttons">
            <button
              type="button"
              onClick={handleAddGoods}
              className="order-form__button order-form__button--add-goods"
            >
              Add Goods
            </button>
          </div>

          <hr />
          <div className="order-form__row">
            <div className="order-form__group">
              <label htmlFor="driver" className="order-form__label">
                Select Driver
              </label>
              <select
                id="driver"
                name="driver"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                className="order-form__select"
                required
              >
                <option value="">Select driver</option>
                {driversLoading ? (
                  <option>Loading...</option>
                ) : driversError ? (
                  <option>Error loading drivers</option>
                ) : (
                  allDriversData?.alldrivers?.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="order-form__group">
              <label htmlFor="vehicle" className="order-form__label">
                Select Vehicle
              </label>
              <select
                id="vehicle"
                name="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="order-form__select"
                required
              >
                <option value="">Select vehicle</option>
                {vehiclesLoading ? (
                  <option>Loading...</option>
                ) : vehiclesError ? (
                  <option>Error loading vehicles</option>
                ) : (
                  allVehiclesData?.vehicles?.vehicle.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.vehicleType}
                    </option>
                  ))
                )}
              </select>
            </div>
            {/* <div className="order-form__group">
              <label htmlFor="status" className="order-form__label">
                Delivery Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="order-form__select"
                required
              >
                <option value="">Select Delivery Status</option>
                {statusLoading ? (
                  <option>Loading...</option>
                ) : statusError ? (
                  <option>Error loading statuses</option>
                ) : (
                  statusData?.deliveryStatus?.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))
                )}
              </select>
            </div> */}
          </div>
          {/* <div className="order-form__row">
            <div className="order-form__group">
              <label htmlFor="dispatchedDate" className="order-form__label">
                Dispatched Date
              </label>
              <input
                type="date"
                id="dispatchedDate"
                name="dispatchedDate"
                value={dispatchedDate}
                onChange={(e) => setDispatchedDate(e.target.value)}
                className="order-form__input"
                required
              />
            </div>

            <div className="order-form__group">
              <label htmlFor="deliveryDate" className="order-form__label">
                Delivery Date
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="order-form__input"
                required
              />
            </div>
          </div> */}
          <div className="buttons">
            <button type="submit" className="order-form__submit-button">
              {loading ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </form>

        <a href="/dashboard" className="add-driver__link">
          Back to Order Lists
        </a>

        {error && <p className="order-form__error">{error.message}</p>}
      </div>
    </div>
  );
}

export default AddOrder;
