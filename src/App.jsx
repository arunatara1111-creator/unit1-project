import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./pages/Home"
import About from "./pages/About"
import ChildView from "./pages/childProfile/ChildView";
import ParentView from "./pages/parentProfile/ParentView";


function App() {
  document.title = "Bright Steps";
  
  
  return (
      
   <BrowserRouter>

    <Header />

    <Navbar />

    <Routes>

    <Route
        path="/"
        element={<Home />}
      />

    <Route
        path="/about"
        element={<About />}
      />
      
      <Route
        path="/child-profile"
        element={<ChildView />}
      />

      <Route
        path="/parent-profile"
        element={<ParentView />}
      />

    </Routes>

    <Footer />

    </BrowserRouter>
    
    
  );
}

export default App;