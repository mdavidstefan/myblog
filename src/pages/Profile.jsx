import React from 'react'
import { middleStyle } from '../utils'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotFound } from './NotFound'
import { useForm } from 'react-hook-form';

export const Profile = () => {
    const { user } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            displayName: user?.displayName,
        }
    });
    if (!user) return <NotFound />

    const onSubmit = async (data) => {
        console.log(data, 'onsubmit');
    }


    return (
        <div className='page'>
            <div style={middleStyle}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <input {...register('displayName')} type='text' />
                    </div>
                    <div>
                        <label> Avatar </label>
                        <input type="file" {...register('file', { required: true })} />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

