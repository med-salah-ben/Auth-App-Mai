import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const Dashboard = () => {
    const {user} = useSelector(state => state.authReducer);

  return (
    <div>
        <h2>User Details</h2>
   {!user ? 
    (<Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>)
    :
   (<>
        <h3>Name : {user.name}  </h3>
        <h3>Last Name : {user.lastName}  </h3>
        <h3>Email : {user.email}  </h3>
   </> )}
    </div>
  )
}

export default Dashboard