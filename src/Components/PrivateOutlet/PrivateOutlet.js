import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateOutlet = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return loggedInUser?.userEmail ? <Outlet /> : <Navigate to="/userSignIn" />
};

export default PrivateOutlet;