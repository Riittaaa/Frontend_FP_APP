import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FETCH_CUSTOMERS } from "../../../graphql/customers/queries";

const useFetchCustomers = () => {
  const { data, loading, error } = useQuery(FETCH_CUSTOMERS);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (data && data.allCustomers) {
      setRowData(data.allCustomers);
    }
  }, [data]);
  return { rowData, loading, error };
};

export default useFetchCustomers;
