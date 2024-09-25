import React, { useEffect, useState } from "react";
import { FETCH_CATEGORIES, FETCH_CATEGORY } from "../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CATEGORY } from "../../graphql/mutations";
import "./Categories.css";

function EditCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { refetch } = useQuery(FETCH_CATEGORIES);
  const [name, setName] = useState("");

  const { loading, error, data } = useQuery(FETCH_CATEGORY, {
    variables: {
      input: categoryId,
    },
  });
  console.log(data);
  // console.log(data.specificCategory.category.name);

  useEffect(() => {
    if (data && data.specificCategory && data.specificCategory.category) {
      setName(data.specificCategory.category[0].name);
    }
  }, [data]);

  const [updateCategory, { loading: updating, error: updateError }] =
    useMutation(UPDATE_CATEGORY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCategory({
        variables: {
          input: {
            id: categoryId,
            categoryInput: {
              name,
            },
          },
        },
      });

      if (response && response.data.updateCategory.message) {
        await refetch();
        console.log(response.data.updateCategory.message);
        navigate("/categories");
      } else {
        console.log(response.data.updateCategory.errors);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="edit-category">
      <div className="edit-category__container">
        <div className="edit-category__heading">
          <h3>Edit Category</h3>
        </div>

        <form className="edit-category__form" onSubmit={handleSubmit}>
          <div className="edit-category__form-group">
            <label htmlFor="name" className="edit-category__label">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="edit-category__input"
              required
            />
          </div>

          <button type="submit" className="edit-category__submit-button">
            {updating ? "Updating..." : "Update Category"}
          </button>

          <a href="/categories" className="edit-category__link">
            Back to Categories
          </a>

          {updateError && (
            <p className="edit-category__error">
              Error updating category: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
