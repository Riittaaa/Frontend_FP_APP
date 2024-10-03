import { useQuery } from "@apollo/client";
import { FETCH_CUSTOMER } from "../../../graphql/customers/queries";

const useFetchCustomer = (customerId) => {
  const { loading, error, data } = useQuery(FETCH_CUSTOMER, {
    variables: { customerId },
  });

  return { loading, error, data };
};

export default useFetchCustomer;
