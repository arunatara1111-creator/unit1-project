import React from "react";
import "../styles/ParentView.css";

export default function Shell({ children }) {
  return (
    <div className="rmc-shell">
      {children}
    </div>
  );
}
