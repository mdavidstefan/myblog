import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import parse from "html-react-parser"
import { deletePost, readSinglePost, toggleLikes } from '../utility/crudUtility'
import { UserContext } from '../context/UserContext'
import { delPhoto } from '../utility/uploadFile'
import { useConfirm } from 'material-ui-confirm'
import { Alerts } from '../components/Alerts'
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import ThumbUpOffAltSharpIcon from '@mui/icons-material/ThumbUpOffAltSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';

export const ReadPost = () => {

    const { user } = useContext(UserContext)
    const [txt, setTxt] = useState(null)
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

    const handleLike = () => {
        if (!user) setTxt("Be kell jelentkezni")
        else toggleLikes(user.uid, post.id)
    }


    return (

        <div className='readpostpage'>

            <div className="detailedpost">
                <div className="detailedposttop">
                    {post && <>
                        <h2>{post.title}</h2>
                        <img src={post.photo["url"]} alt={post.title} style={{ maxHeight: 350 }} />
                        <p className='detailedposttext'>{parse(post.story)}</p>
                    </>}
                </div>
                <div className='detailedpostbottom'>
                    <button className="btn btn-danger" onClick={() => navigate("/posts")} >go back</button>
                    {user && post && (user.uid == post.userId) &&
                        <>
                            <button><DeleteSweepSharpIcon onClick={handleDelete} /></button>
                            <button onClick={() => navigate('/update/' + post.id)}><EditSharpIcon /></button>
                        </>
                    }
                    <button><ThumbUpOffAltSharpIcon onClick={handleLike} /></button>
                    {post && <span>Likes nr: {post?.likes.length}</span>}
                    {txt && <Alerts txt={txt} err={false} />}
                </div>
            </div>

        </div>

    )
}

