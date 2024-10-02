import React, { useState, useEffect } from "react";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { ADD_CATEGORY_URL, EDIT_CATEGORY_URL } from "../consts/routes";
import Table from "../../../components/Table/Table";
import Header from "../../../components/Table/Header";
import ActionCellRenderer from "../../../components/Table/ActionCellRenderer";
// import LoadingErrorHandler from "../../../components/Table/LoadingErrorHandler";

function CategoriesList() {
  const navigate = useNavigate();
  const { rowData: fetchedData, loading, error } = useFetchCategories();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (fetchedData) {
      setRowData(fetchedData);
    }
  }, [fetchedData]);

  const { handleDelete } = useDeleteCategory(setRowData);

  const handleEdit = (categoryId) => {
    navigate(EDIT_CATEGORY_URL(categoryId));
  };

  const handleAddCategory = () => {
    navigate(ADD_CATEGORY_URL);
  };

  const columnDefs = [
    { field: "id", headerName: "ID", hide: true, sortable: true, sort: "asc" },
    {
      field: "name",
      headerName: "Category",
      flex: 1,
      sortable: true,
      minWidth: 150,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <ActionCellRenderer
          data={params.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
      filter: false,
      sortable: false,
      minWidth: 150,
    },
  ];
  // console.log({ error });
  // if (loading || error) {
  //   return (
  //     <LoadingErrorHandler loading={loading} error={error} table="categories" />
  //   );
  // }

  // console.log(error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div>
      <Header title="Categories" click={handleAddCategory} />
      <Table rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
}

export default CategoriesList;
