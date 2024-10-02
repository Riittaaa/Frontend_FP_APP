import { DELETE_VEHICLE } from "../../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { FETCH_VEHICLES } from "../../../graphql/queries";

const useDeleteVehicle = () => {
  const { refetch } = useQuery(FETCH_VEHICLES);
  const [deleteVehicle] = useMutation(DELETE_VEHICLE);

  const handleDelete = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const response = await deleteVehicle({
          variables: {
            deleteVehicleInput: {
              vehicleId: parseInt(vehicleId),
            },
          },
        });

        if (response && response.data.deleteVehicle.message) {
          await refetch();
          // setRowData((prevData) =>
          //   prevData.filter((vehicle) => vehicle.id !== vehicleId)
          // );
          toast.success("Vehicle deleted successfully!!");
        } else {
          toast.error("Error", response.data.deleteVehicle.errors);
        }
      } catch (err) {
        toast.error("Error deleting vehicle: " + err);
      }
    }
  };

  return { handleDelete };
};

export default useDeleteVehicle;
