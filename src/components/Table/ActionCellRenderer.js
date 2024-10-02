import React from "react";
import "../../css/ActionCellRenderer.css";

const ActionCellRenderer = ({ data, onEdit, onDelete, onReactivate }) => {
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
        </>
      )}
    </div>
  );
};

export default ActionCellRenderer;
