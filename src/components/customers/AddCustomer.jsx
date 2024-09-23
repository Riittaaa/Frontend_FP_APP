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
              phone: parseInt(phone),
            },
          },
        },
      });

      if (data.errors) {
        console.log("Error:" + data.createCustomer.errors);
      } else {
        await refetch();
        console.log(data.createCustomer.message);
        navigate("/customers");
      }
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };
  return (
    <div className="add-customer">
      <div className="add-customer__container">
        <div className="add-goods__heading">
          <h3>Add New Customer</h3>
        </div>

        <form className="add-goods__form" onSubmit={handleSubmit}>
          <div className="add-goods__form-group">
            <label htmlFor="name" className="add-goods__label">
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="email" className="add-goods__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="address" className="add-goods__label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="address" className="add-goods__label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <button type="submit" className="add-goods__submit-button">
            {loading ? "Adding..." : "Add Customer"}
          </button>

          <a href="/customers" className="add-goods__link">
            Back to Customers
          </a>

          {error && (
            <p className="add-goods__error">
              Error adding product: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
