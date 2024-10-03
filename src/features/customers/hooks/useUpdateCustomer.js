import { FETCH_CUSTOMERS } from "../../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CUSTOMER } from "../../../graphql/customers/mutations";
import { toast } from "react-toastify";
import { CUSTOMERS_URL } from "../consts/routes";
import { useNavigate } from "react-router-dom";

const useUpdateCustomer = () => {
  const navigate = useNavigate();
  const { refetch } = useQuery(FETCH_CUSTOMERS);
  const [updateCustomer, { loading, error }] = useMutation(UPDATE_CUSTOMER);

  const handleUpdateCustomer = async (
    name,
    email,
    address,
    phone,
    customerId
  ) => {
    try {
      const response = await updateCustomer({
        variables: {
          updateCustomer: {
            customerId,
            customerInput: {
              name,
              email,
              address,
              phone,
            },
          },
        },
      });

      if (response && response.data.updateCustomer.customer) {
        await refetch();
        toast.success("Customer updated successfully!!!");
        navigate(CUSTOMERS_URL);
      } else {
        toast.error("Error:" + response.data.updateCustomer.errors);
      }
    } catch (error) {
      toast.error("Error updating customer:", error);
    }
  };

  return { handleUpdateCustomer, loading, error };
};

export default useUpdateCustomer;
