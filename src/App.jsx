import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";

import ChildView from "./pages/childProfile/ChildView";

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
       <Route
          path="/child-profile"
          element={<ChildView />}
        />

    </Routes>
    </BrowserRouter>

    
  );
}

export default App;