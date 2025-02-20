import React, { useState } from "react";
import ConceptForm from "../components/ConceptForm";
import ConceptList from "../components/ConceptList";
import "./Home.css";

const Home = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState("JavaScript");

  return (
    <div>
      <h1 className="title">Developer Gallery</h1>
      <nav>
        {["JavaScript", "React", "Node.js"].map((category) => (
          <button key={category} onClick={() => setSelectedTab(category)}>
            {category}
          </button>
        ))}
      </nav>
      <ConceptForm selectedTab={selectedTab} user={user} />
      <ConceptList selectedTab={selectedTab} user={user} />
    </div>
  );
};

export default Home;
