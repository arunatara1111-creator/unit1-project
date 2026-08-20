import React from "react";
import ChildView from "./components/ChildView";

function App() {
  const handleBack = () => {
    console.log("Back button clicked");
  };

  return (
    <ChildView onBack={handleBack} />
  );
}

export default App;