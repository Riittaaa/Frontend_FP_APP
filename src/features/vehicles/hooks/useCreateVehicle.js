import { useMutation, useQuery } from "@apollo/client";
import { FETCH_VEHICLES } from "../../../graphql/queries";
import { CREATE_VEHICLE } from "../../../graphql/mutations";
import { VEHICLES_URL } from "../consts/routes";
import { toast } from "react-toastify";

const useCreateVehicle = () => {
  const { refetch } = useQuery(FETCH_VEHICLES);
  const [createVehicle, { loading, error }] = useMutation(CREATE_VEHICLE);

  const handleCreateVehicle = async (
    licensePlate,
    brand,
    vehicleType,
    capacity,
    status,
    navigate
  ) => {
    try {
      const { data } = await createVehicle({
        variables: {
          createVehicle: {
            vehicleInput: {
              licensePlate,
              brand,
              vehicleType,
              status,
              capacity: parseInt(capacity, 10),
            },
          },
        },
      });

      if (data.createVehicle.vehicle) {
        await refetch();
        navigate(VEHICLES_URL);
        toast.success("Vehicle added successfully!!");
      } else {
        toast.error("Error:" + data.createVehicle.errors);
      }
    } catch (err) {
      toast.error("Error adding vehicle:" + err);
    }
  };

  return { handleCreateVehicle, loading, error };
};

export default useCreateVehicle;
