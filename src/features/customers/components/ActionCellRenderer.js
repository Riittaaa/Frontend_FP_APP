import React from "react";

function ActionCellRenderer({
  data,
  onEdit,
  onDelete,
  onReactivate,
  onExport,
}) {
  return (
    <div className="actions">
      {data.deletedAt ? (
        <button
          className="action-button action-button--reactivate"
          onClick={() => onReactivate(data.id)}
        >
          Reactivate
        </button>
      ) : (
        <>
          <button
            className="action-button action-button--edit"
            onClick={() => onEdit(data.id)}
          >
            Edit
          </button>

          <button
            className="action-button action-button--delete"
            onClick={() => onDelete(data.id)}
          >
            Delete
          </button>

          <button
            className="customers__action-button customers__action-button--exportcsv"
            onClick={() => onExport(data.id)}
          >
            Export CSV
          </button>
        </>
      )}
    </div>
  );
}

export default ActionCellRenderer;
