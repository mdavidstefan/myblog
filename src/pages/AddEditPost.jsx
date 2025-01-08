import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Homepage } from './Homepage.jsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ClimbingBoxLoader } from 'react-spinners'
import { Toastify } from '../components/Toastify'
import { middleStyle } from '../utility/utils'
import { Story } from "../components/Story.jsx"
import { uploadFile } from "../utility/uploadFile.js"
import { addPost } from '../utility/crudUtility.js'
import { DropDown } from '../components/DropDown.jsx'
import { CategContext } from '../context/CategContext.jsx'
import { Alerts } from '../components/Alerts.jsx'

export const AddEditPost = () => {

    const [uploaded, setUploaded] = useState(false)
    const [story, setStory] = useState(null)


    //headerbol szedett cuccok
    const { user, msg } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const { categories } = useContext(CategContext)
    const [selcateg, setSelcateg] = useState(null)

    if (!user) { return <Homepage /> }

    const onSubmit = async (data) => {
        setLoading(true)
        console.log(data);

        let newPostData = {
            ...data,
            story,
            author: user.displayName,
            userId: user.uid,
            category: selcateg
        }


        try {

            const file = data?.file ? data?.file[0] : null
            const { url, id } = file ? await uploadFile(file) : null
            delete newPostData.file
            newPostData = { ...newPostData, photo: { url, id } }
            console.log("new post: ", newPostData);
            addPost(newPostData)
            setUploaded(true)
            reset()
            setAvatar(null)
            setStory(null)

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={middleStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label >Post title:</label>
                <input {...register("title", { required: true })} type='text' placeholder='Title' />

                <p className='text-danger' >{errors?.title && "Please add a title"}</p>
                <DropDown categories={categories} setSelcateg={setSelcateg} selcateg={selcateg} />
                <Story setStory={setStory} uploaded={uploaded} />

                <label >picture</label>
                <input type="file" {...register("file", {
                    validate: (value) => {
                        if (!value[0]) return true
                        const acceptedFormats = ["png", "jpg"]
                        //console.log(value[0]);
                        const fileExtension = value[0].name.split(".").pop().toLowerCase()
                        if (!acceptedFormats.includes(fileExtension)) return "invalid file format"
                        if (!value[0].size > 1 * 1000 * 1024) return "maximum file size is 1MB"
                        return true
                    }
                })}
                    onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
                />
                <p className='text-danger'>{errors?.file?.message}</p>
                <input type='submit' disabled={!selcateg || !story} />
                {loading && <ClimbingBoxLoader />}
            </form>
            {msg && <Toastify {...msg} />}
            {uploaded && <Alerts txt="Successful upload" />}
            {avatar && <img className='myavatar' style={{ height: "100px", width: "100px", borderRadius: "100px" }} src={avatar} />}

        </div >
    )
}

