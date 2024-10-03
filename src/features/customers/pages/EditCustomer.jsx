import React, { useEffect, useState } from "react";
import FormWrapper from "../../../components/Form/FormWrapper";
import { useParams } from "react-router-dom";
import useFetchCustomer from "../hooks/useFetchCustomer";
import useUpdateCustomer from "../hooks/useUpdateCustomer";
import CustomerForm from "../components/Form/CustomerForm";

const EditCustomer = () => {
  const { customerId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { loading, error, data } = useFetchCustomer(customerId);
  const {
    handleUpdateCustomer,
    loading: updating,
    error: updateError,
  } = useUpdateCustomer();

  useEffect(() => {
    if (data && data.customer) {
      setName(data.customer.name);
      setEmail(data.customer.email);
      setAddress(data.customer.address);
      setPhone(data.customer.phone);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateCustomer(name, email, address, phone, customerId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading customer: {error.message}</p>;

  return (
    <FormWrapper title="EditCustomer" handleSubmit={handleSubmit}>
      <CustomerForm
        title="Edit Customer"
        name={name}
        email={email}
        address={address}
        phone={phone}
        setName={setName}
        setEmail={setEmail}
        setAddress={setAddress}
        setPhone={setPhone}
        handleSubmit={handleSubmit}
        loading={updating}
        buttonLabel="Update Customer"
        error={updateError}
      />
    </FormWrapper>
  );
};

export default EditCustomer;
