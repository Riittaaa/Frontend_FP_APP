import { useQuery } from "@apollo/client";
import { FETCH_CATEGORY } from "../../../graphql/queries";

const useFetchCategory = (categoryId) => {
  const { loading, error, data } = useQuery(FETCH_CATEGORY, {
    variables: {
      input: categoryId,
    },
  });

  return { loading, error, data };
};

export default useFetchCategory;
