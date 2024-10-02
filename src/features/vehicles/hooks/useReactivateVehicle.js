import { useMutation, useQuery } from "@apollo/client";
import { REACTIVATE_VEHICLE } from "../../../graphql/mutations";
import { toast } from "react-toastify";
import { FETCH_VEHICLES } from "../../../graphql/queries";

const useReactivateVehicle = () => {
  const { refetch } = useQuery(FETCH_VEHICLES);
  const [reactivateVehicle, { loading, error }] =
    useMutation(REACTIVATE_VEHICLE);

  const handleReactivate = async (vehicleId) => {
    try {
      const response = await reactivateVehicle({
        variables: {
          vehicleId: {
            vehicleId,
          },
        },
      });

      if (response) {
        await refetch();
        // navigate(VEHICLES_URL);
        toast.success("Reactivated!!!");
      } else {
        toast.error("Error:" + response.data.reactivateVehicle.errors);
      }
    } catch (error) {
      toast.error("Error reactivating vehicle:" + error);
    }
  };
  return { handleReactivate, loading, error };
};

export default useReactivateVehicle;
