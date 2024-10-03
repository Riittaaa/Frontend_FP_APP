import { useMutation, useQuery } from "@apollo/client";
import { FETCH_DRIVERS } from "../../../graphql/drivers/queries";
import { UPDATE_DRIVER } from "../../../graphql/drivers/mutations";
import { toast } from "react-toastify";
import { DRIVERS_URL } from "../consts/routes";
import { useNavigate } from "react-router-dom";

const useUpdateDriver = () => {
  const navigate = useNavigate();
  const { refetch } = useQuery(FETCH_DRIVERS);
  const [updateDriver, { loading, error }] = useMutation(UPDATE_DRIVER);

  const handleUpdateDriver = async (
    name,
    email,
    address,
    phoneNo,
    status,
    driverId
  ) => {
    try {
      const response = await updateDriver({
        variables: {
          driverinput: {
            driverId,
            driverInput: {
              name,
              email,
              address,
              phoneNo,
              status,
            },
          },
        },
      });

      if (response && response.data.updateDriver.driver) {
        await refetch();
        navigate(DRIVERS_URL);
        toast.success("Driver updated successfully!!!");
      } else {
        toast.error("Error:" + response.data.updateVehicle.errors);
      }
    } catch (error) {
      toast.error("Error updating driver:" + error);
    }
  };

  return { handleUpdateDriver, loading, error };
};

export default useUpdateDriver;
