import React, { useContext, useState, useEffect } from 'react'
import { extractUrlAndId, middleStyle } from '../utility/utils'
import { UserContext } from '../context/UserContext'
import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from 'react-router-dom'
import { NotFound } from './NotFound'
import { useForm } from 'react-hook-form';
import { uploadFile } from '../utility/uploadFile'
import { MoonLoader } from 'react-spinners'
import { Toastify } from '../components/Toastify'

export const Profile = () => {
    const { user, updateUser, msg, logOutUser, deleteAccount } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()
    const confirm = useConfirm()

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

    useEffect(() => {
        !user && navigate("/")
    }, [user])

    const handleDel = async () => {
        try {
            await confirm({
                description: "figyelmeztetés: a változásokat nem lehet visszacsinálni",
                confirmationText: "megerősítés",
                cancellationText: "vissza",
                title: "Biztosan kívánod a fiókod törlését?"
            })
            await deleteAccount()
            logOutUser()

        } catch (error) {
            console.log("cancel: ", error);

        }
    }

    return (
        <div className='profilepage'>
            <div className='profilesettings'>
                <h2>
                    Személyes adatok
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label >Felhasználónév: </label>
                        <input {...register('displayName')} placeholder='felhasználónév' type='text' />
                    </div>
                    <div>
                        <label> Profilkép: </label>
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
                {avatar &&
                    <div className='avatardiv'>
                        <img src={avatar} className='avatar' />
                    </div>
                }
                <button className="btn btn-danger" onClick={handleDel}>Fiók törlése</button>
            </div>
        </div>
    )
}

