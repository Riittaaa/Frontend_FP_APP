import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Vehicles.css";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_VEHICLE, FETCH_STATUSES } from "../../graphql/queries";
import { UPDATE_VEHICLE } from "../../graphql/mutations";

function EditVehicle() {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("");

  const { loading, error, data } = useQuery(FETCH_VEHICLE, {
    variables: { vehicleId: vehicleId },
  });
  const {
    data: statusData,
    loading: statusLoading,
    error: statusError,
  } = useQuery(FETCH_STATUSES);

  useEffect(() => {
    if (
      data &&
      data.specificVehicle &&
      data.specificVehicle.vehicle.length > 0
    ) {
      const vehicle = data.specificVehicle.vehicle[0];
      setLicensePlate(vehicle.licensePlate || "");
      setBrand(vehicle.brand || "");
      setCapacity(vehicle.capacity || "");
      setStatus(vehicle.status || "");
      setVehicleType(vehicle.vehicleType);
    }
  }, [data]);

  const [updateVehicle, { loading: updating, error: updateError }] =
    useMutation(UPDATE_VEHICLE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateVehicle({
        variables: {
          updateVehicle: {
            vehicleId: parseInt(vehicleId),
            vehicleInput: {
              licensePlate,
              brand,
              vehicleType,
              status,
              capacity: parseInt(capacity),
              groupId: 1,
            },
          },
        },
      });

      if (response && response.data.updateVehicle.message) {
        console.log(response.data.updateVehicle.message);
        navigate("/vehicles");
      } else {
        console.log(response.data.updateVehicle.error);
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="add-vehicle-form">
      <div className="add-vehicle-container">
        <div className="heading">
          <h3>Edit Vehicle</h3>
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
            {updating ? "Updating..." : " Update Vehicle"}
          </button>

          {updateError && <p>Error updating vehicle:{updateError.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditVehicle;
