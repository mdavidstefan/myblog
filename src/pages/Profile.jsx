import React from 'react'
import { extractUrlAndId, middleStyle } from '../utility/utils'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { NotFound } from './NotFound'
import { useForm } from 'react-hook-form';
import { uploadFile } from '../utility/uploadFile'
import { MoonLoader } from 'react-spinners'
import { Toastify } from '../components/Toastify'

export const Profile = () => {
    const { user, updateUser, msg } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
    }, [user])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            displayName: user?.displayName || '',
        }
    });
    if (!user) return <NotFound />

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const file = data?.file ? data?.file[0] : null
            const { url, id } = file ? await uploadFile(file) : null
            updateUser(data.displayName, url + '/' + id)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='page'>
            <div style={middleStyle}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label >Display name: </label>
                        <input {...register('displayName')} placeholder='felhasználónév' type='text' />
                    </div>
                    <div>
                        <label> Avatar: </label>
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
                            onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
                        />
                    </div>
                    <p className='text-danger'>{errors?.file?.message}</p>
                    <input type="submit" />
                    {loading && <MoonLoader />}
                </form>
                {msg && <Toastify {...msg} />}
                {avatar && <img src={avatar} style={{ aspectRatio: '1/1', width: '150px' }} />}
            </div>
        </div>
    )
}

