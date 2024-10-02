import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CATEGORY } from "../../../graphql/mutations";
import { FETCH_CATEGORIES } from "../../../graphql/queries";
import { toast } from "react-toastify";
import { CATEGORIES_URL } from "../consts/routes";

export const useUpdateCategory = () => {
  const { refetch } = useQuery(FETCH_CATEGORIES);
  const [updateCategory, { loading, error }] = useMutation(UPDATE_CATEGORY);

  const handleUpdateCategory = async (name, navigate, categoryId) => {
    try {
      const response = await updateCategory({
        variables: {
          input: {
            id: categoryId,
            categoryInput: {
              name,
            },
          },
        },
      });

      if (response && response.data.updateCategory.category) {
        await refetch();
        navigate(CATEGORIES_URL);
        toast.success("Category updated successfully!!");
      } else {
        toast.error("Error:" + response.data.updateCategory.errors);
      }
    } catch (error) {
      toast.error("Error updating category:", error);
    }
  };
  return { handleUpdateCategory, loading, error };
};
