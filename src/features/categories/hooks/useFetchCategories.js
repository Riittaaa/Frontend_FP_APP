import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_CATEGORIES } from "../../../graphql/queries";

export const useFetchCategories = () => {
  const { data, loading, error } = useQuery(FETCH_CATEGORIES);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (data && data.allCategory.category) {
      setRowData(data.allCategory.category);
    }
  }, [data]);

  

  return { rowData, loading, error }; 
};

