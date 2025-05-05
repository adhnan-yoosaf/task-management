import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children, requiredRole}) => {

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={'/login'} />;
    }

    if (requiredRole && requiredRole !== user.role) {
        return <h2 className='text-center'>You don't have the permission to view this page.</h2>;
    }

    return children;

}

export default ProtectedRoute;