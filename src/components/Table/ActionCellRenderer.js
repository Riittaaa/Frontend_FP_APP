import React from "react";
import "../../css/ActionCellRenderer.css";

const ActionCellRenderer = ({ data, onEdit, onDelete }) => {
  return (
    <div className="actions">
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
    </div>
  );
};

export default ActionCellRenderer;
