import React from "react";
import ChildView from "./components/childProfile/ChildView";

function App() {
  document.title = "Bright Steps";
  
  const handleBack = () => {
    console.log("Back button clicked");
  };

  return (
    
    <ChildView onBack={handleBack} />
  );
}

export default App;