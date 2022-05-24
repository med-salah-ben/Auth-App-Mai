import React from 'react';
import {Link} from "react-router-dom"
import {Navbar , Container,Nav,Button} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../JS/actions/authActions';
import Register from '../components/Register';
import Login from "../components/Login"

const AppNavBar = () => {
  const dispatch = useDispatch()
  const {isAuth,user} = useSelector(state => state.authReducer);
  return (
    <div>
          <Navbar bg="primary" variant="dark">
    <Container>
    <Link to="/">
     <Navbar.Brand>Auth App</Navbar.Brand>
    </Link>
    <Nav className="me-auto">
    <Link to="/">
      <Nav style={{textDecoration:"none" , color:'white',  margin:"5px 30px 0 10px"}}>Home</Nav>
    </Link>
    <Link to="/contact">
      <Nav style={{textDecoration:"none" , color:'white',  margin:"5px 30px 0 10px"}}>Contact</Nav>
    </Link>
    {user ?   <Link to="/dashboard">
      <Nav style={{textDecoration:"none" , color:'white',  margin:"5px 30px 0 10px"}}>Dashboard</Nav>
    </Link>:null}
    </Nav>
    </Container>
    {!isAuth ?
     <>
    <Register />
    <Login />
    </>
    : 
    <>
    <span style={{color :"white"}}> <strong>Welcome :</strong>{user.name}</span>
    <Button variant="primary" onClick={()=> dispatch(userLogout())} >
      Logout
    </Button>
    </>
  }
    
  </Navbar>
    </div>
  )
}

export default AppNavBar