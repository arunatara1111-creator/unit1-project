import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import ChildView from "./pages/childProfile/ChildView";

function App() {
  document.title = "Bright Steps";
  
  
  return (
      
   <BrowserRouter>

    <Header />

    <Navbar />

    <Routes>

      
      
      <Route
        path="/child-profile"
        element={<ChildView />}
      />

    </Routes>

    <Footer />

    </BrowserRouter>
    
    
  );
}

export default App;