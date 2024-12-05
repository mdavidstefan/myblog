import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const Toastify = ({ signin, err, signup, resetPassword }) => {
    const { setMsg } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (err) {
            toast.error(err, { position: 'top-left' })
        } else if (signin || signup) {
            toast.success(signin || signup, { position: 'top-center' })
            setTimeout(() => navigate('/'), 1000)
        } else if (resetPassword) {
            toast.success(resetPassword, { position: 'top-center' })
            setTimeout(() => navigate('auth/in'), 1000)
        }

        setMsg({})
    }, [signin, err, signup, resetPassword])

    return (
        <div>
            <ToastContainer />
        </div>
    );
}