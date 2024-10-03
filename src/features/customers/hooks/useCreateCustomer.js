import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_CUSTOMER } from "../../../graphql/customers/mutations";
import { CUSTOMERS_URL } from "../consts/routes";
import { toast } from "react-toastify";
import { FETCH_CUSTOMERS } from "../../../graphql/queries";

const useCreateCustomer = () => {
  const navigate = useNavigate();
  const { refetch } = useQuery(FETCH_CUSTOMERS);
  const [createDriver, { loading, error }] = useMutation(CREATE_CUSTOMER);

  const handleCreateCustomer = async (name, email, address, phone) => {
    try {
      const { data } = await createDriver({
        variables: {
          createCustomerInput: {
            customerInput: {
              name,
              email,
              address,
              phone,
            },
          },
        },
      });

      if (data.createCustomer.customer) {
        await refetch();
        navigate(CUSTOMERS_URL);
        toast.success("Customer created successfully!!!");
      } else {
        toast.error("Error: " + data.createCustomer.errors);
      }
    } catch (err) {
      toast.error("Error adding customer:" + err);
    }
  };
  return { handleCreateCustomer, loading, error };
};

export default useCreateCustomer;
