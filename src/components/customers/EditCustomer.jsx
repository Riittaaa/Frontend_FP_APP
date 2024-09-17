import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FETCH_CUSTOMER, FETCH_CUSTOMERS } from "../../graphql/queries";
import { UPDATE_CUSTOMER } from "../../graphql/mutations";

function EditCustomer() {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const { refetch } = useQuery(FETCH_CUSTOMERS);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { loading, error, data } = useQuery(FETCH_CUSTOMER, {
    variables: { customerId: customerId },
  });

  useEffect(() => {
    if (data && data.customer) {
      setName(data.customer.name);
      setEmail(data.customer.email);
      setAddress(data.customer.address);
      setPhone(data.customer.phone);
    }
  }, [data]);

  const [updateCustomer, { loading: updating, error: updateError }] =
    useMutation(UPDATE_CUSTOMER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCustomer({
        variables: {
          updateCustomer: {
            customerId,
            name,
            email,
            address,
            phone,
          },
        },
      });

      if (response && response.data.updateCustomer.message) {
        await refetch();
        console.log(response.data.updateCustomer.message);
        navigate("/customers");
      } else {
        console.log(response.data.updateCustomer.error);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="edit-customer">
      <div className="edit-customer__container">
        <div className="edit-customer__heading">
          <h3>Edit Customer</h3>
        </div>

        <form className="edit-customer__form" onSubmit={handleSubmit}>
          <div className="edit-customer__form-group">
            <label htmlFor="name" className="edit-customer__label">
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="edit-customer__input"
              required
            />
          </div>

          <div className="edit-customer__form-group">
            <label htmlFor="email" className="edit-customer__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="edit-customer__input"
              required
            />
          </div>

          <div className="edit-customer__form-group">
            <label htmlFor="address" className="edit-customer__label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="edit-customer__input"
              required
            />
          </div>

          <div className="edit-customer__form-group">
            <label htmlFor="address" className="edit-customer__label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="edit-customer__input"
              required
            />
          </div>

          <button type="submit" className="edit-customer__submit-button">
            {updating ? "Updating..." : "Update Customer"}
          </button>

          <a href="/customers" className="edit-customer__link">
            Back to Customers
          </a>

          {updateError && (
            <p className="edit-customer__error">
              Error updating customer: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
