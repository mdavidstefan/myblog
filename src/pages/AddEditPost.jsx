import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Homepage } from './Homepage.jsx'
import { useForm } from 'react-hook-form'
import { MoonLoader } from 'react-spinners'
import { Toastify } from '../components/Toastify'
import { Story } from "../components/Story.jsx"
import { uploadFile } from "../utility/uploadFile.js"
import { addPost, readSinglePost, updatePost } from '../utility/crudUtility.js'
import { DropDown } from '../components/DropDown.jsx'
import { CategContext } from '../context/CategContext.jsx'
import { Alerts } from '../components/Alerts.jsx'
import { useParams } from 'react-router-dom'
import { TextField } from '@mui/material'

export const AddEditPost = () => {

    const [uploaded, setUploaded] = useState(false)
    const [story, setStory] = useState(null)

    //from header
    const { user, msg } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const { categories } = useContext(CategContext)
    const [selcateg, setSelCateg] = useState(null)

    //az editáláshoz kell:
    const [post, setPost] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const params = useParams()

    useEffect(() => {
        if (params?.id) readSinglePost(params.id, setPost)
    }, [params?.id])

    console.log(post);
    useEffect(() => {
        if (post) {
            setValue("title", post.title)
            setSelCateg(post.category)
            setStory(post.story)
        }
    }, [post])

    if (!user) { return <Homepage /> }

    const onSubmit = async (data) => {
        setLoading(true);
        if (params.id) {
            //update
            console.log('update előtt', data);

            try {
                updatePost(params.id, { ...data, story, category: selcateg.story })
            } catch (error) {
                console.log('update', error);

            } finally {
                setLoading(false)
            }
        } else {
            //insert 
            let newPostData = {
                ...data,
                story,
                author: user.displayName,
                userId: user.uid,
                category: selcateg,
                likes: []
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
    }

    return (
        <div className='responsivediv' id='newpostpage'>
            <div className='responsivediv' id='newpost'>
                {avatar && <img id='postpicture' src={avatar} />}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ textAlign: 'center' }}>
                        <label><h4>Poszt címe:</h4></label>
                    </div>
                    <div>
                        <TextField fullWidth {...register("title", { required: true })} label="Cím" variant="standard" sx={{ input: { color: '#e6dada' } }} focused />
                    </div>

                    <p className='text-danger' style={{ textAlign: 'center' }}>{errors?.title && "Adj meg egy címet"}</p>
                    <div className="responsivediv">
                        <DropDown categories={categories} setSelCateg={setSelCateg} selcateg={selcateg}
                        />
                    </div>
                    <div id='storydiv'>
                        <Story setStory={setStory} uploaded={uploaded} story={story} />
                    </div>

                    <div>
                        <input id="filechoose" type="file" disabled={params.id} {...register("file", {
                            required: !params.id,
                            validate: (value) => {
                                if (!value[0]) return true
                                const acceptedFormats = ["png", "jpg"]
                                const fileExtension = value[0].name.split(".").pop().toLowerCase()
                                if (!acceptedFormats.includes(fileExtension)) return "invalid file format"
                                if (!value[0].size > 1 * 1000 * 1024) return "maximum file size is 1MB"
                                return true
                            }
                        })}
                            onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
                        />
                    </div>
                    <p className='text-danger'>{errors?.file?.message}</p>
                    <div>
                        <input type="submit" disabled={!selcateg || !story} value="Mentés" style={{
                            width: '100%', backgroundColor: "#274046", borderRadius: '5px', color: '#ffffff'
                        }} />
                    </div>
                    <div className="loading">
                        {loading && <MoonLoader />}
                    </div>
                </form>
                {msg && <Toastify {...msg} />}
                {uploaded && <Alerts txt="Sikeres feltöltés" />}
            </div>
        </div>
    )
}

