import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_CUSTOMER } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { FETCH_CUSTOMERS } from "../../graphql/queries";

function AddCustomer() {
  const navigate = useNavigate();
  const { refetch } = useQuery(FETCH_CUSTOMERS);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createCustomer({
        variables: {
          createCustomerInput: {
            customerInput: {
              name,
              email,
              address,
              phone,
            },
          },
        },
      });

      if (data.createCustomer.message) {
        await refetch();
        console.log(data.createCustomer.message);
        navigate("/customers");
      } else {
        console.log("Error:" + data.createCustomer.errors[0]);
      }
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };
  return (
    <div className="add-customer">
      <div className="add-customer__container">
        <div className="add-customer__heading">
          <h3>Add New Customer</h3>
        </div>

        <form className="add-customer__form" onSubmit={handleSubmit}>
          <div className="add-customer__form-group">
            <label htmlFor="name" className="add-customer__label">
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-customer__input"
              required
            />
          </div>

          <div className="add-customer__form-group">
            <label htmlFor="email" className="add-customer__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="add-customer__input"
              required
            />
          </div>

          <div className="add-customer__form-group">
            <label htmlFor="address" className="add-customer__label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="add-customer__input"
              required
            />
          </div>

          <div className="add-customer__form-group">
            <label htmlFor="address" className="add-customer__label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="add-customer__input"
              required
            />
          </div>

          <button type="submit" className="add-customer__submit-button">
            {loading ? "Adding..." : "Add Customer"}
          </button>

          <a href="/customers" className="add-customer__link">
            Back to Customers
          </a>

          {error && (
            <p className="add-customer__error">
              Error adding customer: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
