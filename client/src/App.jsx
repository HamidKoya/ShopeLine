import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cyan-100">
        <Header />
        <main className="py-3 mx-auto flex-grow bg-red-300">Hamid</main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
