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
import ShippingScreen from './screens/ShippingScreen.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrdersScreen from './screens/OrdersScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import SuccessScreen from './screens/SuccessScreen.jsx'
import AdminRoutes from './components/AdminRoutes.jsx'
import UserListScreen from './screens/admin/UserListScreen.jsx'
import ProductListScreen from './screens/admin/ProductListScreen.jsx'
import OrderListScreen from './screens/admin/OrderListScreen.jsx'
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx'
import UserEditScreen from './screens/admin/UserEditScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<React.StrictMode><App /></React.StrictMode>}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword/>} />

      {/*Private route*/}

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>} />
        <Route path='/payment' element={<PaymentScreen/>} />  
        <Route path='/place-order' element={<PlaceOrderScreen/>} />  
        <Route path='/order/:id' element={<OrdersScreen/>} />  
        <Route path='/profile' element={<ProfileScreen/>} />
        <Route path='/success-screen' element={<SuccessScreen/>} />
      </Route>
      
      {/*Admin route*/}

      <Route path='' element={<AdminRoutes/>}>
        <Route path='/admin/users' element={<UserListScreen/>} />
        <Route path='/admin/users/:id/edit' element={<UserEditScreen/>} />
        <Route path='/admin/products' element={<ProductListScreen/>} />
        <Route path='/admin/orders' element={<OrderListScreen/>} />
        <Route path='/admin/product/:productId/edit' element={<ProductEditScreen/>} />
        
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
