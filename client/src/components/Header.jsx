import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown, FaCaretUp, FaSearch } from "react-icons/fa";
import { logout } from "../slices/userSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [logoutApi] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap()
      dispatch(logout())
      navigate('/login')
      toast.success('logged Out Successfully')
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  }

  const renderProfileButton = () => {
    return (
      <>
        <button
          onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
          className="text-white flex items-center border rounded-md"
        >
          <FiUser className="mr-1" /> {userInfo?.name} {isProfileMenuOpen ? <FaCaretUp/> : <FaCaretDown/>}
        </button>
        <ul
          className={`absolute ${
            isProfileMenuOpen ? "block" : "hidden"
          } bg-stone-50 bg-opacity-30  px-4 py-2 rounded-md  mt-2 space-y-2 text-black border`}
        >
          <li>
            <Link to="/profile" className="flex items-center">
              <FiUser className="mr-1 text-xs" /> Profile
            </Link>
          </li>
          <li>
            <Link to="/logout" className="flex items-center" onClick={handleLogout}>
              <FiLogOut className="mr-1 text-xs" />
              Logout
            </Link>
          </li>
        </ul>
      </>
    );
  };

  const renderAdminButton = () => {
    return (
      <>
        <button
          onClick={() => setAdminMenuOpen(!isAdminMenuOpen)}
          className="text-white flex items-center border rounded-md"
        >
          <FiUser className="mr-1" /> Admin {isAdminMenuOpen ? <FaCaretUp/> : <FaCaretDown/>}
        </button>
        <ul
          className={`absolute ${
            isAdminMenuOpen ? "block" : "hidden"
          } bg-stone-50 bg-opacity-30  px-4 py-2 rounded-md  mt-2 space-y-2 text-black border`}
        >
          <li>
            <Link to="/admin/users" className="flex items-center">
             Users
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="flex items-center">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="flex items-center">
               Orders
            </Link>
          </li>
          <li>
            <Link to="/logout" className="flex items-center" onClick={handleLogout}>
              <FiLogOut className="mr-1 text-xs" />
              Logout
            </Link>
          </li>
        </ul>
      </>
    );
  };

  const renderSignInButtton = () => (
    <Link to="/login" className="flex items-center">
      <FiLogIn className="mr-1 text-white"/>
      <button className="text-white">Sign In</button>
    </Link>
  )

  return (
    <nav className="bg-gray-800 p-4 bg-opacity-20">
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-extrabold">
            ShopLine
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="ml-4 p-2 bg-stone-50 bg-opacity-80 rounded-lg text-black hidden sm:block"
          />
          <button className="text-xl text-white py-2 px-4 rounded-md hidden sm:block ml-2">
            <FaSearch />
          </button>
        </div>
        <div className="hidden sm:flex items-center text-md font-light space-x-4">
          <Link
            to="/cart"
            className="text-white  relative py-3 flex items-center"
          >
            <FiShoppingCart className="mr-1 " />
            Cart
            <span className="bg-blue-500 top-[-5px] right-[-5px] absolute text-[10px] text-white rounded-full p-1 px-2 ml-2">
              {cartItems.length}
            </span>
          </Link>
          {userInfo && <div className="relative group">{renderProfileButton()}</div>}
          {userInfo?.isAdmin && <div className="relative group">{renderAdminButton()}</div>}
          {!userInfo && renderSignInButtton()}
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mt-4 sm:hidden">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md bg-gray-700 text-white w-full mb-2"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2">
            Search
          </button>
          <div className="space-y-2">
            <Link to="/cart" className="text-white flex items-center">
              <FiShoppingCart className="mr-1" />
              Cart
              <span className="bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                {cartItems.length}
              </span>
            </Link>
            {userInfo && <div className="relative group">{renderProfileButton()}</div>}
            {userInfo?.isAdmin && <div className="relative group">{renderAdminButton()}</div>}
            {!userInfo && renderSignInButtton()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
