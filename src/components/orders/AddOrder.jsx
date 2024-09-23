import React, { useState } from "react";
import "./Orders.css";
import {
  FETCH_BRANCHES,
  FETCH_CUSTOMERS,
  FETCH_GOODS,
} from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ORDERGROUP } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const navigate = useNavigate();
  const [plannedAt, setPlannedAt] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerBranch, setCustomerBranch] = useState("");
  const [goodsList, setGoodsList] = useState([{ goods: "", quantity: "" }]);
  const [recurring, setRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState("");

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
    data: allGoodsData,
    loading: allGoodsLoading,
    error: goodsError,
  } = useQuery(FETCH_GOODS);

  const [createOrderGroup, { loading, error }] = useMutation(CREATE_ORDERGROUP);

  // console.log(allGoodsData.goods.goods.name);

  const handleGoodsChange = (index, event) => {
    const { name, value } = event.target;
    const newGoodsList = [...goodsList];
    newGoodsList[index][name] = value;
    setGoodsList(newGoodsList);
  };

  const handleAddGoods = () => {
    setGoodsList([...goodsList, { goods: "", quantity: "" }]);
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
              groupId: 1,
              plannedAt,
              customerBranchId: customerBranch,
              recurring,
              linedItemsAttributes: goodsList.map((item) => ({
                goodsId: parseInt(item.goods),
                quantity: parseInt(item.quantity),
              })),
            },
          },
        },
      });

      if (data.errors) {
        console.log("Error");
      } else {
        // console.log(data.addCustomerbranch.message);
        navigate("/orderlists");
      }
    } catch (err) {
      console.error("Error adding order group:", err);
    }

    console.log("Planned At:", plannedAt);
    console.log("Customer:", customer);
    console.log("Customer Branch:", customerBranch);
    console.log("Goods List:", goodsList);
    console.log("Recurring:", recurring);
    if (recurring) {
      console.log("Recurrence Frequency:", recurrenceFrequency);
      console.log("Next Due Date:", nextDueDate);
      console.log("Recurrence End Date:", recurrenceEndDate);
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
                {!customersLoading &&
                  allCustomersData?.allCustomers?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
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
                {!customerBranchesLoading &&
                  allCustomerBranches?.allBranches?.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branchLocation}
                    </option>
                  ))}
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

          {/* Conditionally Render Recurrence Fields */}
          {recurring && (
            <>
              <div className="order-form__row">
                <div className="order-form__group">
                  <label
                    htmlFor="recurrenceFrequency"
                    className="order-form__label"
                  >
                    Recurrence Frequency
                  </label>
                  <input
                    type="text"
                    id="recurrenceFrequency"
                    name="recurrenceFrequency"
                    value={recurrenceFrequency}
                    onChange={(e) => setRecurrenceFrequency(e.target.value)}
                    className="order-form__input"
                    required
                  />
                </div>
                <div className="order-form__group">
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
                </div>
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
            </>
          )}

          {goodsList.map((goodsItem, index) => (
            <div className="order-form__row" key={index}>
              <div className="order-form__group">
                <label htmlFor={`goods-${index}`} className="add-goods__label">
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
                  {!allGoodsLoading &&
                    allGoodsData?.goods?.goods?.map((goods) => (
                      <option key={goods.id} value={goods.id}>
                        {goods.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="order-form__group">
                <label
                  htmlFor={`quantity-${index}`}
                  className="add-goods__label"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  name="quantity"
                  value={goodsItem.quantity}
                  onChange={(e) => handleGoodsChange(index, e)}
                  className="add-goods__input"
                  required
                />
                <label htmlFor={`quantity-${index}`}>unit</label>
              </div>
            </div>
          ))}

          <div className="buttons">
            <button
              type="button"
              className="order-form__button order-form__button--add-goods"
              onClick={handleAddGoods}
            >
              + Add goods
            </button>
            <button type="submit" className="order-form__submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrder;
