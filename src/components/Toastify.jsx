import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

export const Toastify = ({ signin, err, signup, resetPassword, update }) => {
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
        } else if (update) {
            toast.success(update, { position: 'top-center' })
        }

        setMsg({})
    }, [signin, err, signup, resetPassword, update])

    return (
        <div>
            <ToastContainer />
        </div>
    );
}