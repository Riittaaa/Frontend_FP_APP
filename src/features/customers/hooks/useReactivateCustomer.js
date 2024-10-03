import { useMutation, useQuery } from "@apollo/client";
import { FETCH_CUSTOMERS } from "../../../graphql/customers/queries";
import { REACTIVATE_CUSTOMER } from "../../../graphql/customers/mutations";
import { toast } from "react-toastify";

const useReactivateCustomer = () => {
  const { refetch } = useQuery(FETCH_CUSTOMERS);
  const [reactivateCustomer] = useMutation(REACTIVATE_CUSTOMER);

  const handleReactivate = async (customerId) => {
    try {
      const response = await reactivateCustomer({
        variables: {
          input: {
            customerId,
          },
        },
      });
      if (response && response.data.reactivateCustomer.customer) {
        await refetch();
        toast.success("Customer reactivated successfully!!!");
      } else {
        toast.error("Error:" + response.data.reactivateCustomer.errors);
      }
    } catch (error) {
      toast.error("Error reactivating driver:" + error);
    }
  };
  return { handleReactivate };
};

export default useReactivateCustomer;
