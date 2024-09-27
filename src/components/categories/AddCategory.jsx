import React, { useState } from "react";
import { FETCH_CATEGORIES } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";
import { CREATE_CATEGORY } from "../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import "./Categories.css";

function AddCategory() {
  const navigate = useNavigate();
  const { refetch } = useQuery(FETCH_CATEGORIES);
  const [name, setName] = useState("");

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createCategory({
        variables: {
          input: {
            categoryInput: {
              name,
            },
          },
        },
      });

      if (data.createCategory.message) {
        await refetch();
        navigate("/categories");
        toast.success("Category created successfully!!");
      } else {
        toast.error("Error:" + data.createCategory.errors);
      }
    } catch (err) {
      toast.error("Error adding category:", err);
    }
  };

  return (
    <div className="add-category">
      <div className="add-category__container">
        <div className="add-category__heading">
          <h3>Add New Category</h3>
        </div>

        <form className="add-category__form" onSubmit={handleSubmit}>
          <div className="add-category__form-group">
            <label htmlFor="name" className="add-category__label">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-category__input"
              required
            />
          </div>

          <button type="submit" className="add-category__submit-button">
            {loading ? "Adding..." : "Add Category"}
          </button>

          <a href="/categories" className="add-category__link">
            Back to Categories
          </a>

          {error && (
            <p className="add-category__error">
              Error adding category: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
