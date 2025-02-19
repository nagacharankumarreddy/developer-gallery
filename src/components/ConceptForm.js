import React, { useState } from "react";
import { addDoc, collection, db } from "../firebase/firebase";
import "./ConceptForm.css";
import { ADMIN_UID } from "./constants";

const ConceptForm = ({ selectedTab, user }) => {
  const [concept, setConcept] = useState("");
  const [answer, setAnswer] = useState("");
  const [sandboxLink, setSandboxLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!concept || !answer) return;

    try {
      await addDoc(collection(db, "concepts"), {
        category: selectedTab,
        concept,
        answer,
        sandboxLink,
        userId: user?.uid,
      });

      setConcept("");
      setAnswer("");
      setSandboxLink("");
    } catch (error) {
      console.error("Error adding concept:", error);
    }
  };

  if (!user || user.uid !== ADMIN_UID) return null;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Concept"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        required
      />
      <textarea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="CodeSandbox Link"
        value={sandboxLink}
        onChange={(e) => setSandboxLink(e.target.value)}
      />
      <button type="submit">Add Concept</button>
    </form>
  );
};

export default ConceptForm;
