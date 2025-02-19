import React from "react";
import "./Tabs.css";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      {["JavaScript", "React", "Node.js"].map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? "tab active" : "tab"}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
