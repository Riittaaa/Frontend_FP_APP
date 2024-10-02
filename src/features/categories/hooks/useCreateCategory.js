import { useMutation, useQuery } from "@apollo/client";
import { FETCH_CATEGORIES } from "../../../graphql/queries";
import { CREATE_CATEGORY } from "../../../graphql/mutations";
import { toast } from "react-toastify";
import { CATEGORIES_URL } from "../consts/routes";

export const useCreateCategory = () => {
  const { refetch } = useQuery(FETCH_CATEGORIES);
  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY);

  const handleCreateCategory = async (name, navigate) => {
    try {
      const { data } = await createCategory({
        variables: {
          input: {
            categoryInput: {
              name,
            },
          },
        },
      });

      if (data.createCategory.category) {
        await refetch();
        navigate(CATEGORIES_URL);
        toast.success("Category added successfully!!");
      } else {
        toast.error("Error:" + data.createCategory.errors);
      }
    } catch (err) {
      toast.error("Error adding category:", err);
    }
  };

  return { handleCreateCategory, loading, error };
};
