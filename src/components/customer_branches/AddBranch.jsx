import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_BRANCH } from "../../graphql/mutations";
import { FETCH_BRANCHES } from "../../graphql/queries";
import { toast } from "react-toastify";

function AddBranch() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { refetch } = useQuery(FETCH_BRANCHES, {
    variables: {
      customerId: parseInt(customerId),
    },
  });

  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("branch@email.com");

  const [createBranch, { loading, error }] = useMutation(CREATE_BRANCH);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createBranch({
        variables: {
          customerBranch: {
            customerbranchInput: {
              customerId,
              branchLocation: location,
            },
          },
        },
      });

      if (data.errors) {
        toast.error("Error:" + data.addCustomerbranch.errors);
      } else {
        await refetch();
        toast.success("Customer branch added successfully!!");
        navigate(`/customers/${customerId}/branches`);
      }
    } catch (err) {
      toast.error("Error adding customer branch:", err);
    }
  };

  return (
    <div className="add-customer">
      <div className="add-customer__container">
        <div className="add-goods__heading">
          <h3>Add New Customer Branch</h3>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="add-goods__form-group">
            <label htmlFor="location" className="add-goods__label">
              Branch Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <div className="add-goods__form-group">
            <label htmlFor="email" className="add-goods__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="add-goods__input"
              required
            />
          </div>

          <button type="submit" className="add-goods__submit-button">
            {loading ? "Adding..." : "Add Branch"}
            {/* Submit */}
          </button>

          <a
            href={`/customers/${customerId}/branches`}
            className="add-goods__link"
          >
            Back to Customer Branches
          </a>

          {error && (
            <p className="add-goods__error">
              Error adding branch: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddBranch;
