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

const ConceptList = ({ selectedTab, user }) => {
  const [concepts, setConcepts] = useState([]);

  const fetchConcepts = async () => {
    const querySnapshot = await getDocs(collection(db, "concepts"));
    const data = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((concept) => concept.category === selectedTab);
    setConcepts(data);
  };

  useEffect(() => {
    fetchConcepts();
  }, [selectedTab, fetchConcepts]);

  const deleteConcept = async (id) => {
    await deleteDoc(doc(db, "concepts", id));
    fetchConcepts();
  };

  const editConcept = async (id, newConcept) => {
    await updateDoc(doc(db, "concepts", id), newConcept);
    fetchConcepts();
  };

  return (
    <div className="concept-container">
      {concepts.map(({ id, concept, answer, sandboxLink }) => (
        <div key={id} className="concept-card">
          <h3>{concept}</h3>
          <p>{answer}</p>
          {sandboxLink && (
            <a href={sandboxLink} target="_blank" rel="noopener noreferrer">
              CodeSandbox
            </a>
          )}
          {user?.uid === ADMIN_UID && (
            <div className="button-group">
              <button className="delete-btn" onClick={() => deleteConcept(id)}>
                Delete
              </button>
              <button
                className="edit-btn"
                onClick={() =>
                  editConcept(id, {
                    concept: prompt("Edit Concept", concept) || concept,
                    answer,
                  })
                }
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConceptList;
