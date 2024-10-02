import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FETCH_VEHICLE } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import useUpdateVehicle from "../hooks/useUpdateVehicle";
import FormWrapper from "../../../components/Form/FormWrapper";
import InputField from "../../../components/Form/InputField";
import useFetchStatuses from "../hooks/useFetchStatuses";
import SelectField from "../../../components/Form/SelectField";
import Button from "../../../components/Form/Button";
import BackToTableLink from "../../../components/Form/BackToTableLink";
import { VEHICLES_URL } from "../consts/routes";

function EditVehicle() {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const {
    statusOptions,
    loading: statusLoading,
    error: statusError,
  } = useFetchStatuses();
  const { loading, error, data } = useQuery(FETCH_VEHICLE, {
    variables: { vehicleId },
  });

  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data && data.specificVehicle && data.specificVehicle.vehicle) {
      const vehicle = data.specificVehicle.vehicle[0];
      setLicensePlate(vehicle.licensePlate || "");
      setBrand(vehicle.brand || "");
      setCapacity(vehicle.capacity || "");
      setStatus(vehicle.status || "");
      setVehicleType(vehicle.vehicleType || "");
    }
  }, [data]);

  const {
    handleUpdateVehicle,
    loading: updating,
    error: updateError,
  } = useUpdateVehicle();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateVehicle(
      licensePlate,
      brand,
      vehicleType,
      capacity,
      status,
      vehicleId,
      navigate
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching vehicle: {error.message}</p>;

  return (
    <FormWrapper title="Edit Vehicle" handleSubmit={handleSubmit}>
      <InputField
        label="License Plate"
        type="text"
        id="licensePlate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        required={true}
      />

      <InputField
        label="Brand"
        type="text"
        id="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required={true}
      />

      <InputField
        label="Vehicle Type"
        type="text"
        id="vehicleType"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        required={true}
      />

      <InputField
        label="Capacity"
        type="number"
        id="capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required={true}
        min="1"
      />

      <SelectField
        label="Status"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required={true}
        options={statusOptions}
        loading={statusLoading}
        error={statusError}
      />

      <Button label="Update Vehicle" loading={updating} />

      <BackToTableLink link={VEHICLES_URL} table="Vehicles" />

      {updateError && (
        <p className="form-error">
          Error updating vehicle: {updateError.message}
        </p>
      )}
    </FormWrapper>
  );
}

export default EditVehicle;
