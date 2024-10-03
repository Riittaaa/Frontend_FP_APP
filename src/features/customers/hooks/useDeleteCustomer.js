import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CUSTOMER } from "../../../graphql/customers/mutations";
import { toast } from "react-toastify";
import { FETCH_CUSTOMERS } from "../../../graphql/customers/queries";

const useDeleteCustomer = () => {
  const { refetch } = useQuery(FETCH_CUSTOMERS);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

  const handleDelete = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await deleteCustomer({
          variables: {
            deleteCustomer: {
              customerId: parseInt(customerId),
            },
          },
        });

        if (response && response.data.deleteCustomer.customer) {
          await refetch();
          toast.success("Customer deleted successfully!!!");
        } else {
          toast.error("Error" + response.data.deleteCustomer.errors);
        }
      } catch (err) {
        toast.error("Error deleting customer:" + err);
      }
    }
  };

  return { handleDelete };
};

export default useDeleteCustomer;
