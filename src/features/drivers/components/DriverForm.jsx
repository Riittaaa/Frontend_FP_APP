import React from "react";
import InputField from "../../../components/Form/InputField";
import SelectField from "../../../components/Form/SelectField";
import Button from "../../../components/Form/Button";

function DriverForm({
  driverData,
  handleInputChange,
  statusOptions,
  statusLoading,
  statusError,
  buttonLabel,
  loading,
  error,
}) {
  return (
    <>
      <InputField
        label="Driver Name"
        type="text"
        id="name"
        value={driverData.name}
        onChange={handleInputChange}
        required={true}
      />

      <InputField
        label="Email"
        type="email"
        id="email"
        value={driverData.email}
        onChange={handleInputChange}
        required={true}
      />

      <InputField
        label="Address"
        type="text"
        id="address"
        value={driverData.address}
        onChange={handleInputChange}
        required={true}
      />

      <InputField
        label="Phone"
        type="text"
        id="phoneNo"
        value={driverData.phoneNo}
        onChange={handleInputChange}
        required={true}
      />

      <SelectField
        label="Status"
        id="status"
        value={driverData.status}
        onChange={handleInputChange}
        required={true}
        options={statusOptions}
        loading={statusLoading}
        error={statusError}
      />

      <Button label={buttonLabel} loading={loading} />
      {error && <p className="form-error">{error.message}</p>}
    </>
  );
}

export default DriverForm;
