import React, { useEffect, useState } from "react";
import {
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "../firebase/firebase";
import "./ConceptList.css";
import { ADMIN_UID } from "./constants";
import EditModal from "./EditModal";
import ExpandModal from "./ExpandModal";

const ConceptList = ({ selectedTab, user }) => {
  const [concepts, setConcepts] = useState([]);
  const [editConceptData, setEditConceptData] = useState(null);
  const [expandConceptData, setExpandConceptData] = useState(null);

  const fetchConcepts = async () => {
    const querySnapshot = await getDocs(collection(db, "concepts"));
    const data = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((concept) => concept.category === selectedTab);
    setConcepts(data);
  };

  useEffect(() => {
    fetchConcepts();
  }, [selectedTab]);

  const deleteConcept = async (id) => {
    await deleteDoc(doc(db, "concepts", id));
    fetchConcepts();
  };

  const saveEditedConcept = async (updatedConcept) => {
    await updateDoc(doc(db, "concepts", updatedConcept.id), updatedConcept);
    fetchConcepts();
  };

  return (
    <div className="concept-container">
      {concepts.map(({ id, concept, answer, sandboxLink }) => (
        <div key={id} className="concept-card">
          <h3>{concept}</h3>
          <p>{answer}</p>
          <div className="button-group">
            <button
              className="expand-btn"
              onClick={() =>
                setExpandConceptData({ concept, answer, sandboxLink })
              }
            >
              Expand
            </button>

            {sandboxLink && (
              <a
                href={sandboxLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sandbox-btn"
              >
                Code
              </a>
            )}

            {user?.uid === ADMIN_UID && (
              <>
                <button
                  className="edit-btn"
                  onClick={() =>
                    setEditConceptData({ id, concept, answer, sandboxLink })
                  }
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteConcept(id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {expandConceptData && (
        <ExpandModal
          conceptData={expandConceptData}
          onClose={() => setExpandConceptData(null)}
        />
      )}

      {editConceptData && (
        <EditModal
          conceptData={editConceptData}
          onSave={saveEditedConcept}
          onClose={() => setEditConceptData(null)}
        />
      )}
    </div>
  );
};

export default ConceptList;
