import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../../../graphql/mutations";
import { toast } from "react-toastify";

export const useDeleteCategory = (setRowData) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await deleteCategory({
          variables: {
            input: {
              id: categoryId,
            },
          },
        });

        if (response && response.data.deleteCategory.message) {
          setRowData((prevData) =>
            prevData.filter((category) => category.id !== categoryId)
          );
          toast.success("Category deleted successfully!!");
        } else {
          toast.error("Error: " + response.data.deleteCategory.errors);
        }
      } catch (err) {
        toast.error("Error deleting category: " + err);
      }
    }
  };

  return { handleDelete, setRowData };
};
