import { useQuery } from "@apollo/client";
import { FETCH_DRIVER } from "../../../graphql/drivers/queries";

const useFetchDriver = (driverId) => {
  const { loading, error, data } = useQuery(FETCH_DRIVER, {
    variables: { input: driverId },
  });

  return { loading, error, data };
};

export default useFetchDriver;
