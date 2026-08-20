import React from "react";
import "./styles/child.css";

export default function Shell({ children }) {
  return (
    <div className="child-app">
      {children}
    </div>
  );
}