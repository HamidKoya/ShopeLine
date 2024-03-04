import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (

    <div className="flex flex-col min-h-screen bg-green-300">
      <Header />
      <main className="container py-3 px-8 mx-auto flex-grow bg-indigo-800">
        <ToastContainer/>
        <Outlet />
      </main>
      <Footer />
    </div>

  );
};

export default App;
