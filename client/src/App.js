import React , {useEffect} from "react"
import {  Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAuthUser } from "./JS/actions/authActions";

import AppNavBar from './Pages/AppNavBar';
import './App.css';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';


function App() {
  // const {isAuth} = useSelector(state=>state.authReducer)
  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(getAuthUser())

  },[])
  return (
   <div>
     <AppNavBar />
     <Routes>
     <Route path='/' element={<Home />} />
     <Route path="/contact" element={<Contact />} />
     <Route path="/dashboard" element={<PrivateRoute>
      <Dashboard />
     </PrivateRoute>} />
     </Routes>
     <ToastContainer />
   </div>
  );
}

export default App;
