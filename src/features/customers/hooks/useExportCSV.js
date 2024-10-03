import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { EXPORT_CSV } from "../../../graphql/customers/queries";

const useExportCSV = () => {
  const [exportCSV] = useLazyQuery(EXPORT_CSV);

  const handleExport = async (customerId) => {
    try {
      const response = await exportCSV({ variables: { id: customerId } });
      const csvUrl = response.data.csvExport;

      window.open(
        `https://d3a0-113-199-231-86.ngrok-free.app${csvUrl}`,
        "_blank"
      );
    } catch (error) {
      toast.error("Error exporting CSV:", error);
    }
  };

  return { handleExport };
};

export default useExportCSV;
