import React from "react";
import "./ConceptModal.css";

const ConceptModal = ({ concept, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{concept.concept}</h2>
        <p>{concept.answer}</p>
        {concept.sandboxLink && (
          <a
            href={concept.sandboxLink}
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

export default ConceptModal;
