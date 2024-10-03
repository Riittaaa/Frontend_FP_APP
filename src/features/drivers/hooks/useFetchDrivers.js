import { useQuery } from "@apollo/client";
import { FETCH_DRIVERS } from "../../../graphql/drivers/queries";
import { useEffect, useState } from "react";

const useFetchDrivers = () => {
  const { data, loading, error } = useQuery(FETCH_DRIVERS);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (data && data.alldrivers) {
      setRowData(data.alldrivers);
    }
  }, [data]);
  return { rowData, loading, error };
};

export default useFetchDrivers;
