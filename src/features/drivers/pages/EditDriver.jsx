import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchStatuses from "../hooks/useFetchStatuses";
import useUpdateDriver from "../hooks/useUpdateDriver";
import FormWrapper from "../../../components/Form/FormWrapper";
import BackToTableLink from "../../../components/Form/BackToTableLink";
import { DRIVERS_URL } from "../consts/routes";
import useFetchDriver from "../hooks/useFetchDriver";
import DriverForm from "../components/DriverForm";

function EditDriver() {
  const { driverId } = useParams();
  const {
    statusOptions,
    loading: statusLoading,
    error: statusError,
  } = useFetchStatuses();
  const { loading, error, data } = useFetchDriver(driverId);

  const [driverData, setDriverData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    status: "",
  });

  useEffect(() => {
    if (data && data.driver) {
      const driver = data.driver;
      setDriverData({
        name: driver.name,
        email: driver.email,
        address: driver.address,
        phoneNo: driver.phoneNo,
        status: driver.status,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDriverData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const {
    handleUpdateDriver,
    loading: updateLoading,
    error: updateError,
  } = useUpdateDriver();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, phoneNo, status } = driverData;
    handleUpdateDriver(name, email, address, phoneNo, status, driverId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <FormWrapper title="Edit Driver" handleSubmit={handleSubmit}>
      <DriverForm
        driverData={driverData}
        handleInputChange={handleInputChange}
        statusOptions={statusOptions}
        statusLoading={statusLoading}
        statusError={statusError}
        buttonLabel="Update Driver"
        handleSubmit={handleSubmit}
        loading={updateLoading}
        error={updateError}
      />
      <BackToTableLink link={DRIVERS_URL} table="Drivers" />
    </FormWrapper>
  );
}

export default EditDriver;
