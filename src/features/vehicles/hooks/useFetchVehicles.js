import { useEffect, useState } from "react";
import { FETCH_VEHICLES } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";

const useFetchVehicles = () => {
  const { data, loading, error } = useQuery(FETCH_VEHICLES);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (data && data.vehicles && data.vehicles.vehicle) {
      setRowData(data.vehicles.vehicle);
    }
  }, [data]);

  return { rowData, loading, error };
};

export default useFetchVehicles;
