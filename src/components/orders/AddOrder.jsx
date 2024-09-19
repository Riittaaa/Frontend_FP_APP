import React, { useState } from "react";
import "./Orders.css";
import { FETCH_BRANCHES, FETCH_CUSTOMERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

function AddOrder() {
  const [plannedAt, setPlannedAt] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerBranch, setCustomerBranch] = useState("");
  const [goodsList, setGoodsList] = useState([{ goods: "", quantity: "" }]);

  const {
    data: allCustomersData,
    loading: customersLoading,
    error: customersError,
  } = useQuery(FETCH_CUSTOMERS);

  const {
    data: allCusomerBranches,
    loading: cusomerBranchesLoading,
    error: cusomerBranchesError,
  } = useQuery(FETCH_BRANCHES, {
    variables: {
      customerId: 1,
    },
  });

  const handleGoodsChange = (index, event) => {
    const { name, value } = event.target;
    const newGoodsList = [...goodsList];
    newGoodsList[index][name] = value;
    setGoodsList(newGoodsList);
  };

  const handleAddGoods = () => {
    setGoodsList([...goodsList, { goods: "", quantity: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Planned At:", plannedAt);
    console.log("Customer:", customer);
    console.log("Customer Branch:", customerBranch);
    console.log("Goods List:", goodsList);
  };

  return (
    <div className="container">
      <div className="order-form">
        <h3 className="order-form__title">Add Order</h3>
        <form className="order-form__container" onSubmit={handleSubmit}>
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
          <div className="order-form__row">
            <div className="order-form__group">
              <label htmlFor="customer" className="order-form__label">
                Select Customer
              </label>
              <select
                id="customer"
                name="customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
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
                <option value="">CB1</option>
                <option value="">CB2</option>
                <option value="">CB3</option>
              </select>
            </div>
          </div>
          {/* Other form groups and rows */}

          <div className="form-group">
            <label htmlFor="recurring" className="add-goods__label">
              Recurring
              <input
                type="checkbox"
                id="recurring"
                name="recurring"
                className="recurring"
              />
            </label>
          </div>

          {goodsList.map((goodsItem, index) => (
            <div className="order-form__row" key={index}>
              <div className="order-form__group">
                {/* <div className="form-group"> */}
                <label htmlFor={`goods-${index}`} className="add-goods__label">
                  Select Goods
                </label>
                <select
                  id={`goods-${index}`}
                  name="goods"
                  value={goodsItem.goods}
                  onChange={(e) => handleGoodsChange(index, e)}
                  className="add-goods__select"
                  required
                >
                  <option value="">Select goods</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="C3">C3</option>
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
            // </div>
          ))}
          <div className="buttons">
            <button
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
