import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_DRIVER } from "../../graphql/mutations";
import "./Drivers.css";
import { FETCH_DRIVER_STATUSES } from "../../graphql/queries";

function AddDriver() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [status, setStatus] = useState("");

  const {
    data: statusData,
    loading: statusLoading,
    error: statusError,
  } = useQuery(FETCH_DRIVER_STATUSES);
  const [createDriver, { loading, error }] = useMutation(CREATE_DRIVER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createDriver({
        variables: {
          input: {
            driverInput: {
              name,
              email,
              address,
              phoneNo,
              status,
            },
          },
        },
      });

      if (data.error) {
        console.log("Error: " + data.addDriver.error);
      } else {
        console.log(data.addDriver.message);
        navigate("/drivers");
      }
    } catch (err) {
      console.error("Error adding driver:", err);
    }
  };

  return (
    <div className="add-driver">
      <div className="add-driver__container">
        <div className="add-driver__heading">
          <h3>Add New Driver</h3>
        </div>

        <form className="add-driver__form" onSubmit={handleSubmit}>
          <div className="add-driver__form-group">
            <label htmlFor="name" className="add-driver__label">
              Driver Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-driver__input"
              required
            />
          </div>

          <div className="add-driver__form-group">
            <label htmlFor="email" className="add-driver__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="add-driver__input"
              required
            />
          </div>

          <div className="add-driver__form-group">
            <label htmlFor="address" className="add-driver__label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="add-driver__input"
              required
            />
          </div>

          <div className="add-driver__form-group">
            <label htmlFor="address" className="add-driver__label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="add-driver__input"
              required
            />
          </div>

          <div className="add-driver__form-group">
            <label htmlFor="status" className="add-driver__label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="add-driver__select"
              required
            >
              <option value="">Select Status</option>
              {statusLoading ? (
                <option>Loading...</option>
              ) : statusError ? (
                <option>Error loading statuses</option>
              ) : (
                statusData.StatusEnum.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))
              )}
            </select>
            {statusLoading && <p>Loading statuses...</p>}
            {statusError && (
              <p>Error loading statuses: {statusError.message}</p>
            )}
          </div>

          <button type="submit" className="add-driver__submit-button">
            {loading ? "Adding..." : "Add Driver"}
          </button>

          <a href="/drivers" className="add-driver__link">
            Back to Drivers
          </a>

          {error && (
            <p className="add-driver__error">
              Error adding driver: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddDriver;
