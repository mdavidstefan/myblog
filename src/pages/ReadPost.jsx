import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import parse from "html-react-parser"
import { middleStyle } from '../utility/utils'
import { deletePost, readSinglePost } from '../utility/crudUtility'
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { delPhoto } from '../utility/uploadFile'
import { useConfirm } from 'material-ui-confirm'


export const ReadPost = () => {

    const { user } = useContext(UserContext)
    const params = useParams()
    const navigate = useNavigate()
    const confirm = useConfirm()
    console.log(params);
    const [post, setPost] = useState(null)

    useEffect(() => {
        readSinglePost(params.id, setPost)
    }, [])

    const handleDelete = async () => {
        try {
            await confirm({
                description: "changes cannot be unmade",
                confirmationText: "confirm",
                cancellationText: "cancel",
                title: "Do you really want to delete this post?"
            })
            deletePost(post.id) //firestore-ból való törlés
            delPhoto(post.photo.id) //cloudinary-ból törli a fájlt
            navigate('/posts')
        } catch (error) {
            console.log("cancel: ", error);

        }
    }


    return (
        <div style={middleStyle}>
            {post && <>
                <img src={post.photo["url"]} alt={post.title} />
                <p>{parse(post.story)}</p>
            </>}
            <button className="btn btn-danger" onClick={() => navigate("/posts")} >go back</button>
            {user && post && (user.uid == post.userId) &&
                <button><DeleteIcon onClick={handleDelete}/></button>
            }
        </div>
    )
}

