import React, { useState } from "react";
import FormWrapper from "../../../components/Form/FormWrapper";
import useFetchStatuses from "../hooks/useFetchStatuses";
import BackToTableLink from "../../../components/Form/BackToTableLink";
import { DRIVERS_URL } from "../consts/routes";
import useCreateDriver from "../hooks/useCreateDriver";
import DriverForm from "../components/DriverForm";

function AddDriver() {
  const {
    statusOptions,
    loading: statusLoading,
    error: statusError,
  } = useFetchStatuses();
  const { handleCreateDriver, loading, error } = useCreateDriver();

  const [driverData, setDriverData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDriverData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, phoneNo, status } = driverData;
    handleCreateDriver(name, email, address, phoneNo, status);
  };

  return (
    <FormWrapper title="Add New Driver" handleSubmit={handleSubmit}>
      <DriverForm
        driverData={driverData} 
        handleInputChange={handleInputChange} 
        statusOptions={statusOptions}
        statusLoading={statusLoading}
        statusError={statusError}
        buttonLabel="Add Driver" 
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      <BackToTableLink link={DRIVERS_URL} table="Drivers" />
    </FormWrapper>
  );
}

export default AddDriver;
