import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import store from './store.js';
import {Provider} from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screen/HomeScreen.jsx'
import LoginScreen from './screen/LoginScreen.jsx'
import RegisterScreen from './screen/RegisterScreen.jsx'
import ProfileScreen from './screen/ProfileScreen.jsx';
import AdminLoginScreen from './screen/AdminLoginScreen.jsx';
import AdminHome from './screen/AdminHome.jsx';
import AdminAddUser from './screen/AdminAddUser.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >

      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route  path='/login' element={<LoginScreen/>}/>
      <Route  path='/register' element={<RegisterScreen/>}/>
      {/* private route */}
      <Route path='' element={<PrivateRoute/>}>
      <Route  path='/profile' element={<ProfileScreen/>}/>
      </Route>
      <Route  path='/admin' element={<AdminLoginScreen/>}/>
      <Route  path='/admindash' element={<AdminHome/>}/>
      <Route path="/adminDash/AdminAddUser" element={<AdminAddUser/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
<RouterProvider router={router}/>
  </React.StrictMode>,
  </Provider>

)
