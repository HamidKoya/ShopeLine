import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" text-black py-3">
      <div className="container mx-auto text-center">
        <p className="text-sm">ShopeLine &copy;{currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
