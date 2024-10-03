import { useMutation, useQuery } from "@apollo/client";
import { REACTIVATE_DRIVER } from "../../../graphql/drivers/mutations";
import { toast } from "react-toastify";
import { FETCH_DRIVERS } from "../../../graphql/drivers/queries";

const useReactivateDriver = () => {
  const { refetch } = useQuery(FETCH_DRIVERS);
  const [reactivateDriver] = useMutation(REACTIVATE_DRIVER);

  const handleReactivate = async (driverId) => {
    try {
      const response = await reactivateDriver({
        variables: {
          input: {
            driverId,
          },
        },
      });
      if (response && response.data.reactivateDriver.driver) {
        await refetch();
        toast.success("Driver reactivated successfully!!!");
      } else {
        toast.error("Error:" + response.data.reactivateDriver.errors);
      }
    } catch (error) {
      toast.error("Error reactivating driver:" + error);
    }
  };
  return { handleReactivate };
};

export default useReactivateDriver;
