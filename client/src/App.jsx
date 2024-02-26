import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";

const App = () => {
  return (

    <div className="flex flex-col min-h-screen bg-green-300">
      <Header />
      <main className="container py-3 px-8 mx-auto flex-grow bg-indigo-800">
        <Outlet />
      </main>
      <Footer />
    </div>

  );
};

export default App;
