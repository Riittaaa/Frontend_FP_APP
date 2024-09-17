import React, { useState } from "react";
import "./Vehicles.css";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_VEHICLE } from "../../graphql/mutations";
import { FETCH_STATUSES } from "../../graphql/queries";

function AddVehicle() {
  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("");

  const {
    data: statusData,
    loading: statusLoading,
    error: statusError,
  } = useQuery(FETCH_STATUSES);
  const [createVehicle, { loading, error }] = useMutation(CREATE_VEHICLE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createVehicle({
        variables: {
          createVehicle: {
            vehicleInput: {
              licensePlate,
              brand,
              vehicleType,
              status,
              capacity: parseInt(capacity, 10),
              groupId: 1,
            },
          },
        },
      });
      if (data.errors) {
        console.log("Error: " + data.createVehicle.errors);
      } else {
        console.log(data.createVehicle.message);
      }
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
  };

  return (
    <div className="add-vehicle-form">
      <div className="add-vehicle-container">
        <div className="heading">
          <h3>Add New Vehicle</h3>
        </div>

        <form className="vehicle-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="licensePlate">License Plate</label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              {statusLoading ? (
                <option>Loading...</option>
              ) : statusError ? (
                <option>Error loading statuses</option>
              ) : (
                statusData.statusEnumValues.map((status) => (
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

          <button type="submit" className="submit-button">
            {loading ? "Adding..." : "Add Vehicle"}
          </button>

          <a href="/vehicles">Back to Vehicles</a>
          {error && <p>Error adding vehicle: {error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
