import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (

    <div className="flex flex-col min-h-screen " style={{
      background: 'rgb(238,174,202)',
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    }}>
      <Header />
      <main className="container py-3 px-8 mx-auto flex justify-center items-center flex-grow ">
        <ToastContainer/>
        <Outlet />
      </main>
      <Footer />
    </div>

  );
};

export default App;
