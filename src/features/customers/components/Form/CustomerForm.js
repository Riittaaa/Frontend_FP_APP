import React from "react";

import InputField from "../../../../components/Form/InputField";
import Button from "../../../../components/Form/Button";
import BackToTableLink from "../../../../components/Form/BackToTableLink";
import { CUSTOMERS_URL } from "../../consts/routes";

const CustomerForm = ({
  name,
  email,
  address,
  phone,
  setName,
  setEmail,
  setAddress,
  setPhone,
  loading,
  buttonLabel,
  error,
}) => {
  return (
    <>
      <InputField
        label="Customer Name"
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={true}
      />

      <InputField
        label="Email"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={true}
      />

      <InputField
        label="Address"
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required={true}
      />

      <InputField
        label="Phone"
        type="number"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required={true}
      />

      <Button label={buttonLabel} loading={loading} />

      <BackToTableLink link={CUSTOMERS_URL} table="Customers" />

      {error && <p className="form-error">{error.message}</p>}
    </>
  );
};

export default CustomerForm;
