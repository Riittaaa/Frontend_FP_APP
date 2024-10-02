import React, { useState } from "react";
import FormWrapper from "../../../components/Form/FormWrapper";
import InputField from "../../../components/Form/InputField";
import { useNavigate } from "react-router-dom";
import SelectField from "../../../components/Form/SelectField";
import Button from "../../../components/Form/Button";
import useCreateVehicle from "../hooks/useCreateVehicle";
import { VEHICLES_URL } from "../consts/routes";
import BackToTableLink from "../../../components/Form/BackToTableLink";
import useFetchStatuses from "../hooks/useFetchStatuses";

function AddVehicle() {
  const navigate = useNavigate();
  const {
    statusOptions,
    loading: statusLoading,
    error: statusError,
  } = useFetchStatuses();
  const { handleCreateVehicle, loading, error } = useCreateVehicle();

  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreateVehicle(
      licensePlate,
      brand,
      vehicleType,
      capacity,
      status,
      navigate
    );
  };

  return (
    <FormWrapper title="Add New Vehicle" handleSubmit={handleSubmit}>
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

      <Button label="Add Vehicle" loading={loading} />
      <BackToTableLink link={VEHICLES_URL} table="Vehicles" />
      {error && (
        <p className="form-error">Error adding vehicle: {error.message}</p>
      )}
    </FormWrapper>
  );
}

export default AddVehicle;
