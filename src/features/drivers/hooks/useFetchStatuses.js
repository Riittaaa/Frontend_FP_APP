import { useQuery } from "@apollo/client";
import { FETCH_DRIVER_STATUSES } from "../../../graphql/drivers/queries";

const useFetchStatuses = () => {
  const { data, loading, error } = useQuery(FETCH_DRIVER_STATUSES);
  // console.log(data);
  const statusOptions = data?.StatusEnum?.map((status) => ({
    value: status,
    label: status,
    key: status,
  }));

  return {
    statusOptions,
    loading,
    error,
  };
};

export default useFetchStatuses;
