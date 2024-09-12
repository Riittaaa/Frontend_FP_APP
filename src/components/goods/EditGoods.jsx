import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_SPECIFIC_GOODS } from "../../graphql/queries";
import { UPDATE_GOODS } from "../../graphql/mutations";
import "./Goods.css";

function EditGoods() {
  const navigate = useNavigate();
  const { goodsId } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fuel");
  const [soldAs, setSoldAs] = useState("");
  const [unit, setUnit] = useState("");
  const [availability, setAvailability] = useState("IN_STOCK");

  const { loading, error, data } = useQuery(FETCH_SPECIFIC_GOODS, {
    variables: { goodsId: goodsId },
  });

  useEffect(() => {
    if (data && data.specificGoods && data.specificGoods.goods.length > 0) {
      const goods = data.specificGoods.goods[0];
      setName(goods.name || "");
      setCategory(goods.category || "Fuel");
      setSoldAs(goods.soldAs || "");
      setUnit(goods.unit || "");
      setAvailability(goods.availability || "IN_STOCK");
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
              category,
            },
          },
        },
      });

      if (response && response.data.updateGoods.message) {
        console.log(response.data.updateGoods.message);
        navigate("/goods");
      } else {
        console.log("Error", response.data.updateGoods.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
              Product Name
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
              <option value="Fuel">Fuel</option>
              <option value="Gas">Gas</option>
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
              <option value="DISCONTINUED">DISCONTINUED</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
              <option value="IN_STOCK">IN_STOCK</option>
            </select>
          </div>

          <button
            type="submit"
            className="edit-goods__submit-button"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Product"}
          </button>

          <a href="/goods" className="edit-goods__link">
            Back to Goods
          </a>

          {updateError && (
            <p className="edit-goods__error">
              Error updating product: {updateError.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditGoods;
