import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DRIVERS_URL } from "../consts/routes";
import { FETCH_DRIVERS } from "../../../graphql/drivers/queries";
import { CREATE_DRIVER } from "../../../graphql/drivers/mutations";

const useCreateDriver = () => {
  const navigate = useNavigate();
  const { refetch } = useQuery(FETCH_DRIVERS);
  const [createDriver, { loading, error }] = useMutation(CREATE_DRIVER);

  const handleCreateDriver = async (name, email, address, phoneNo, status) => {
    try {
      const { data } = await createDriver({
        variables: {
          input: {
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

      if (data.addDriver.driver) {
        await refetch();
        navigate(DRIVERS_URL);
        toast.success("Driver created successfully!!!");
      } else {
        toast.error("Error: " + data.addDriver.errors);
      }
    } catch (err) {
      toast.error("Error adding driver:" + err);
    }
  };
  return { handleCreateDriver, loading, error };
};

export default useCreateDriver;
