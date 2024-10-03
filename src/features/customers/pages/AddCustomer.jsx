import React, { useState } from "react";
import FormWrapper from "../../../components/Form/FormWrapper";
import CustomerForm from "./../components/Form/CustomerForm";
import useCreateCustomer from "../hooks/useCreateCustomer";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { handleCreateCustomer, loading, error } = useCreateCustomer();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateCustomer(name, email, address, phone);
  };

  return (
    <FormWrapper title="Add New Customer" handleSubmit={handleSubmit}>
      <CustomerForm
        title="Add New Customer"
        name={name}
        email={email}
        address={address}
        phone={phone}
        setName={setName}
        setEmail={setEmail}
        setAddress={setAddress}
        setPhone={setPhone}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonLabel="Add Customer"
        error={error}
      />
    </FormWrapper>
  );
};

export default AddCustomer;
