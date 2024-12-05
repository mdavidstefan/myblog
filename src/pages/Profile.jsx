import React from 'react'
import { middleStyle } from '../utils'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotFound } from './NotFound'
import { useForm } from 'react-hook-form';
import { useState } from 'react'

export const Profile = () => {
    const { user, updateUser } = useContext(UserContext)
    const [photo, setPhoto] = useState(null)

    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            displayName: user?.displayName || '',
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
                        <input {...register('displayName')} placeholder='felhasználónév' type='text' />
                    </div>
                    <div>
                        <label> Avatar </label>
                        <input {...register('file', {
                            validate: (value) => {
                                if (!value[0]) return true
                                const acceptedFormats = ['jpg', 'png']
                                console.log(value[0]);
                                const fileExtension = value[0].name.split('.').pop().toLowerCase()
                                if (!acceptedFormats.includes(fileExtension)) return "invalid file format"
                                if (value[0].size > 1 * 1000 * 1024) return "maximum file size is 1MB"
                                return true

                            }
                        })} type="file"
                            onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
                        />
                    </div>
                    <input type="submit" />
                </form>
                {photo && <img src={photo} />}
            </div>
        </div>
    )
}

