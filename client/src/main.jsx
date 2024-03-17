import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import store from './store.js'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import ResetPassword from './screens/ResetPassword.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<React.StrictMode><App /></React.StrictMode>}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
