import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { FETCH_DRIVERS } from "../../../graphql/drivers/queries";
import { DELETE_DRIVER } from "../../../graphql/drivers/mutations";

const useDeleteDriver = () => {
  const { refetch } = useQuery(FETCH_DRIVERS);
  const [deleteDriver] = useMutation(DELETE_DRIVER);

  const handleDelete = async (driverId) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        const response = await deleteDriver({
          variables: {
            input: {
              driverId,
            },
          },
        });

        if (response && response.data.deleteDriver.message) {
          await refetch();
          toast.success("Driver deleted successfully!!!");
        } else {
          toast.error("Error" + response.data.deleteDriver.errors);
        }
      } catch (err) {
        toast.error("Error deleting driver:" + err);
      }
    }
  };

  return { handleDelete };
};

export default useDeleteDriver;
