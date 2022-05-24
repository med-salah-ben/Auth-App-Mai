import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux"

const PrivateRoute = ({children}) => {
    const {isAuth} = useSelector(state => state.authReducer)
  return (
    <div>
        {isAuth ? children : <Navigate to="/" />}
    </div>
  )
}

export default PrivateRoute