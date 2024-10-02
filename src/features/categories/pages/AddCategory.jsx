import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../../components/Form/FormWrapper";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Form/Button";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { CATEGORIES_URL } from "../consts/routes";
import BackToTableLink from "../../../components/Form/BackToTableLink";

function AddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { handleCreateCategory, loading, error } = useCreateCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreateCategory(name, navigate);
  };

  return (
    // <div className="category">
    <FormWrapper title="Add New Category" handleSubmit={handleSubmit}>
      <InputField
        label="Category Name"
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={true}
      />
      <Button label="Add Category" loading={loading} />

      <BackToTableLink link={CATEGORIES_URL} table="Categories" />
      {error && (
        <p className="form-error">Error adding category: {error.message}</p>
      )}
    </FormWrapper>
    // </div>
  );
}

export default AddCategory;
