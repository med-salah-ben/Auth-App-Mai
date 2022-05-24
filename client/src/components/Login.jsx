import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { Modal,Button, Form } from 'react-bootstrap';

import { loginUser } from '../JS/actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const userLogin = ()=>{
    dispatch(loginUser({email,password}))
  
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
        <Form.Text className="text-muted">
      We'll never share your email with anyone else.
         </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
  </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{userLogin();handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register