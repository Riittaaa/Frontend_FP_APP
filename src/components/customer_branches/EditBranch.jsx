import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FETCH_BRANCH } from "../../graphql/queries";
import { UPDATE_BRANCH } from "../../graphql/mutations";
import { toast } from "react-toastify";

function EditBranch() {
  const url = window.location.href;
  const urlObj = new URL(url);
  const segments = urlObj.pathname.split("/");
  const customerId = segments[2];
  const customerBranchId = segments[4];

  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("branch@email.com");

  const { loading, error, data, refetch } = useQuery(FETCH_BRANCH, {
    variables: { id: customerBranchId },
  });

  useEffect(() => {
    if (data && data.customerBranch) {
      setLocation(data.customerBranch.branchLocation);
    }
  }, [data]);

  const [updateBranch, { loading: updating, error: updateError }] =
    useMutation(UPDATE_BRANCH);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateBranch({
        variables: {
          input: {
            customerbranchInput: {
              customerId: customerId,
              branchLocation: location,
            },
            customerbranchId: customerBranchId,
          },
        },
      });

      if (response && response.data.updateCustomerbranch.message) {
        await refetch();
        toast.success("Customer branch updated successfully!!");
        navigate(`/customers/${customerId}/branches`);
      } else {
        toast.error(response.data.updateCustomerbranch.errors);
      }
    } catch (error) {
      toast.error("Error updating branch:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.errors}</p>;

  return (
    <div className="add-customer">
      <div className="add-customer__container">
        <div className="add-goods__heading">
          <h3>Edit Customer Branch</h3>
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
            {updating ? "Updating..." : "Update Branch"}
          </button>

          <a
            href={`/customers/${customerId}/branches`}
            className="add-goods__link"
          >
            Back to Customer Branches
          </a>

          {updateError && (
            <p className="add-goods__error">
              Error updating customer branch: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditBranch;
