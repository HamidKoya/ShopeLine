import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-3">
      <div className="container mx-auto text-center bg-red-400">
        <p className="text-sm bg-green-300">ShopeLine &copy;{currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
