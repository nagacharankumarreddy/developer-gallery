import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ conceptData, onSave, onClose }) => {
  const [formData, setFormData] = useState(conceptData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Concept</h2>
        <form onSubmit={handleSubmit}>
          <label>Concept:</label>
          <input
            type="text"
            name="concept"
            value={formData.concept}
            onChange={handleChange}
            required
          />

          <label>Answer:</label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
          />

          <label>CodeSandbox Link:</label>
          <input
            type="text"
            name="sandboxLink"
            value={formData.sandboxLink}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
