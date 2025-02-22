import React from "react";
import "./ExpandModal.css";

const ExpandModal = ({ conceptData, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{conceptData.concept}</h2>
        <p>{conceptData.answer}</p>
        {conceptData.sandboxLink && (
          <a
            href={conceptData.sandboxLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            CodeSandbox
          </a>
        )}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ExpandModal;
