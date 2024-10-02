import React, { useEffect, useState } from "react";
import FormWrapper from "../../../components/Form/FormWrapper";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Form/Button";
import useFetchCategory from "../hooks/useFetchCategory";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import BackToTableLink from "../../../components/Form/BackToTableLink";
import { CATEGORIES_URL } from "../consts/routes";
// import LoadingErrorHandler from "../../../components/Table/LoadingErrorHandler";

function EditCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const { loading, errors, data } = useFetchCategory(categoryId);

  useEffect(() => {
    if (data && data.specificCategory && data.specificCategory.category) {
      setName(data.specificCategory.category[0].name);
    }
  }, [data]);

  const {
    handleUpdateCategory,
    loading: updating,
    error: updateError,
  } = useUpdateCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateCategory(name, navigate, categoryId);
  };

  // <LoadingErrorHandler loading={loading} error={error} />;
  if (loading) return <p>Loading...</p>;
  if (errors) return <p>Error: {errors.message}</p>;

  return (
    <FormWrapper title="Edit Category" handleSubmit={handleSubmit}>
      <InputField
        label="Category Name"
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={true}
      />
      <Button label="Update Category" loading={updating} error={updateError} />
      <BackToTableLink link={CATEGORIES_URL} table="Categories" />
    </FormWrapper>
  );
}

export default EditCategory;
