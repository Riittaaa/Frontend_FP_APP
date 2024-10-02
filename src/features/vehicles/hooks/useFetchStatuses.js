import { useQuery } from "@apollo/client";
import { FETCH_STATUSES } from "../../../graphql/queries";

const useFetchStatuses = () => {
  const { data, loading, error } = useQuery(FETCH_STATUSES);

  const statusOptions = data?.statusEnumValues.map((status) => ({
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
