import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Drivers.css";
import { FETCH_DRIVER, FETCH_DRIVER_STATUSES } from "../../graphql/queries";
import { UPDATE_DRIVER } from "../../graphql/mutations";

function EditDriver() {
  const navigate = useNavigate();
  const { driverId } = useParams();

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
  const { driverLoading, driverError, data } = useQuery(FETCH_DRIVER, {
    variables: { input: driverId },
  });

  useEffect(() => {
    if (data && data.driver) {
      const driver = data.driver;
      setName(driver.name);
      setEmail(driver.email);
      setAddress(driver.address);
      setPhoneNo(driver.phoneNo);
      setStatus(driver.status);
    }
  }, [data]);

  const [updateDriver, { loading: updating, error: updateError }] =
    useMutation(UPDATE_DRIVER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateDriver({
        variables: {
          driverinput: {
            driverId,
            driverInput: {
              name,
              email,
              address,
              phoneNo: parseInt(phoneNo),
              status,
              groupId: 1,
            },
            // "driverId": 39,
            // "driverInput": {
            //    "name": "Update Driver",
            //   "address": "update",
            //   "phoneNo": 232311112,
            //   "status": "DEPLOYED",
            //   "email": "updat@ail.com",
            //   "groupId": 1
            // }
            // input: {
            //   name,
            //   email,
            //   address,
            //   phoneNo: parseInt(phoneNo),
            //   status,
            //   driverId,
            // },
          },
        },
      });

      if (data.error) {
        console.log("Error: " + data.updateDriver.error);
      } else {
        console.log(data.updateDriver.message);
        navigate("/drivers");
      }
    } catch (err) {
      console.error("Error updating driver:", err);
    }
  };

  if (driverLoading) return <p>Loading...</p>;
  if (driverError) return <p>Error: {driverError.message}</p>;

  return (
    <div className="edit-driver">
      <div className="edit-driver__container">
        <div className="edit-driver__heading">
          <h3>Edit Driver</h3>
        </div>

        <form className="edit-driver__form" onSubmit={handleSubmit}>
          <div className="edit-driver__form-group">
            <label htmlFor="name" className="edit-driver__label">
              Driver Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="edit-driver__input"
              required
            />
          </div>

          <div className="edit-driver__form-group">
            <label htmlFor="email" className="edit-driver__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="edit-driver__input"
              required
            />
          </div>

          <div className="edit-driver__form-group">
            <label htmlFor="address" className="edit-driver__label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="edit-driver__input"
              required
            />
          </div>

          <div className="edit-driver__form-group">
            <label htmlFor="address" className="edit-driver__label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="edit-driver__input"
              required
            />
          </div>

          <div className="edit-driver__form-group">
            <label htmlFor="status" className="edit-driver__label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="edit-driver__select"
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

          <button type="submit" className="edit-driver__submit-button">
            {updating ? "Updating..." : "Update Driver"}
          </button>

          <a href="/drivers" className="add-driver__link">
            Back to Drivers
          </a>

          {updateError && (
            <p className="add-driver__error">
              Error adding driver: {updateError.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditDriver;
