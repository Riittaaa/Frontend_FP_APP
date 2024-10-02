import { useMutation, useQuery } from "@apollo/client";
import { FETCH_VEHICLES } from "../../../graphql/queries";
import { UPDATE_VEHICLE } from "../../../graphql/mutations";
import { VEHICLES_URL } from "../consts/routes";
import { toast } from "react-toastify";

const useUpdateVehicle = () => {
  const { refetch } = useQuery(FETCH_VEHICLES);
  const [updateVehicle, { loading, error }] = useMutation(UPDATE_VEHICLE);

  const handleUpdateVehicle = async (
    licensePlate,
    brand,
    vehicleType,
    capacity,
    status,
    vehicleId,
    navigate
  ) => {
    try {
      const response = await updateVehicle({
        variables: {
          updateVehicle: {
            vehicleId: parseInt(vehicleId),
            vehicleInput: {
              licensePlate,
              brand,
              vehicleType,
              status,
              capacity: parseInt(capacity),
            },
          },
        },
      });

      if (response && response.data.updateVehicle.vehicle) {
        await refetch();
        navigate(VEHICLES_URL);
        toast.success("Vehicle updated successfully!!");
      } else {
        toast.error("Error:" + response.data.updateVehicle.errors);
      }
    } catch (error) {
      toast.error("Error updating vehicle:" + error);
    }
  };

  return { handleUpdateVehicle, loading, error };
};

export default useUpdateVehicle;
