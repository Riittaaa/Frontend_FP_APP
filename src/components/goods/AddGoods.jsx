import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_GOODS } from "../../graphql/mutations";
import "./Goods.css";
import {
  FETCH_AVAILABILITIES,
  FETCH_CATEGORIES,
  FETCH_GOODS,
} from "../../graphql/queries";
import { useNavigate } from "react-router-dom";

function AddGoods() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [soldAs, setSoldAs] = useState("");
  const [unit, setUnit] = useState("");
  const [availability, setAvailability] = useState("");
  const { refetch } = useQuery(FETCH_GOODS);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(FETCH_CATEGORIES);
  const {
    data: availabilities,
    loading: availabilitiesLoading,
    error: availabilitiesError,
  } = useQuery(FETCH_AVAILABILITIES);
  const [createGoods, { loading, error }] = useMutation(CREATE_GOODS);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createGoods({
        variables: {
          goodsInput: {
            goodsInput: {
              name,
              categoryId: category,
              soldAs,
              unit,
              availability,
            },
          },
        },
      });

      if (data.errors) {
        console.log("Error: " + data.createGoods.errors);
      } else {
        console.log(data.createGoods.message);
        await refetch();

        navigate("/goods");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="add-goods">
      <div className="add-goods__container">
        <div className="add-goods__heading">
          <h3>Add New Goods</h3>
        </div>

        <form className="add-goods__form" onSubmit={handleSubmit}>
          <div className="add-goods__form-group">
            <label htmlFor="name" className="add-goods__label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="category" className="add-goods__label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="add-goods__select"
              required
            >
              <option value="">Select category</option>
              {categoriesLoading ? (
                <option>Loading...</option>
              ) : categoriesError ? (
                <option>Error loading categories</option>
              ) : (
                categories.allCategory.category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="sold-as" className="add-goods__label">
              Sold As
            </label>
            <input
              type="text"
              id="sold-as"
              name="sold-as"
              value={soldAs}
              onChange={(e) => setSoldAs(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="unit" className="add-goods__label">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="availability" className="add-goods__label">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="add-goods__select"
              required
            >
              <option value="">Select availability</option>
              {availabilitiesLoading ? (
                <option>Loading...</option>
              ) : availabilitiesError ? (
                <option>Error loading availabilities</option>
              ) : (
                availabilities.availibility.map((availability) => (
                  <option key={availability} value={availability}>
                    {availability}
                  </option>
                ))
              )}
            </select>
          </div>

          <button type="submit" className="add-goods__submit-button">
            {loading ? "Adding..." : "Add Product"}
          </button>

          <a href="/goods" className="add-goods__link">
            Back to Goods
          </a>

          {error && (
            <p className="add-goods__error">
              Error adding product: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddGoods;
