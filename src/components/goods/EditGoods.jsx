import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  FETCH_AVAILABILITIES,
  FETCH_CATEGORIES,
  FETCH_SPECIFIC_GOODS,
} from "../../graphql/queries";
import { UPDATE_GOODS } from "../../graphql/mutations";
import "./Goods.css";
import { toast } from "react-toastify";

function EditGoods() {
  const navigate = useNavigate();
  const { goodsId } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [soldAs, setSoldAs] = useState("");
  const [unit, setUnit] = useState("");
  const [availability, setAvailability] = useState("");

  const { loading, error, data } = useQuery(FETCH_SPECIFIC_GOODS, {
    variables: { goodsId: goodsId },
  });
  // console.log(data);
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

  useEffect(() => {
    if (data && data.specificGoods && data.specificGoods.goods.length > 0) {
      const goods = data.specificGoods.goods[0];
      setName(goods.name || "");
      setCategory(goods.category.id || "");
      setSoldAs(goods.soldAs || "");
      setUnit(goods.unit || "");
      setAvailability(goods.availability || "");
    }
  }, [data]);

  const [updateGoods, { loading: updating, error: updateError }] =
    useMutation(UPDATE_GOODS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateGoods({
        variables: {
          goodsInput: {
            goodsId: parseInt(goodsId),
            goodsInput: {
              name,
              soldAs,
              unit,
              availability,
              categoryId: parseInt(category),
            },
          },
        },
      });

      if (response && response.data.updateGoods.message) {
        toast.success("Goods updated successfully!!");
        navigate("/goods");
      } else {
        toast.error("Error", response.data.updateGoods.error);
      }
    } catch (error) {
      toast.error("Error updating goods:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="edit-goods">
      <div className="add-goods__container">
        <div className="edit-goods__heading">
          <h3 className="edit-goods__title">Edit Goods</h3>
        </div>
        <form className="edit-goods__form" onSubmit={handleSubmit}>
          <div className="edit-goods__form-group">
            <label htmlFor="name" className="edit-goods__label">
              Goods Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="edit-goods__input"
            />
          </div>

          <div className="edit-goods__form-group">
            <label htmlFor="category" className="edit-goods__label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="edit-goods__select"
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

          <div className="edit-goods__form-group">
            <label htmlFor="sold-as" className="edit-goods__label">
              Sold As
            </label>
            <input
              type="text"
              id="sold-as"
              name="sold-as"
              value={soldAs}
              onChange={(e) => setSoldAs(e.target.value)}
              className="edit-goods__input"
            />
          </div>

          <div className="edit-goods__form-group">
            <label htmlFor="unit" className="edit-goods__label">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="edit-goods__input"
            />
          </div>

          <div className="edit-goods__form-group">
            <label htmlFor="availability" className="edit-goods__label">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="edit-goods__select"
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

          <button
            type="submit"
            className="edit-goods__submit-button"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update goods"}
          </button>

          <a href="/goods" className="edit-goods__link">
            Back to Goods
          </a>

          {updateError && (
            <p className="edit-goods__error">
              Error updating goods: {updateError.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditGoods;
