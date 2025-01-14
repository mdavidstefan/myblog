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
import { Button, IconButton } from '@mui/material'

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
                description: "A változtatások nem visszavonhatóak",
                confirmationText: "törlés",
                cancellationText: "vissza",
                title: "Biztosan ki akarod törölni ezt a bejegyzést?"
            })
            deletePost(post.id) //firestore-ból való törlés
            delPhoto(post.photo.id) //cloudinary-ból törli a fájlt
            navigate('/posts')
        } catch (error) {
            console.log("cancel: ", error);

        }
    }

    const handleLike = () => {
        if (!user) setTxt("Be kell jelentkezni a like-olás funkció használatához!")
        else toggleLikes(user.uid, post.id)
    }

    return (
        <div className='responsivediv' id='readpostpage'>

            <div className="responsivediv" id='detailedpost'>
                <div id="detailedposttop">
                    {post && <>
                        <h2>{post.title}</h2>
                        <img src={post.photo["url"]} alt={post.title} style={{ 
                            maxWidth: '100%', height:'auto', objectFit: 'cover'}} />
                        <p className='detailedposttext'>{parse(post.story)}</p>
                    </>}
                </div>
                <div id='detailedpostbottom' style={{ width: '100%' }}>
                    <div>
                        {user && post && (user.uid == post.userId) &&
                            <>
                                <Button variant='contained' color="error" onClick={() => navigate("/posts")}>Vissza a posztokhoz</Button>
                                <IconButton><DeleteSweepSharpIcon onClick={handleDelete} /></IconButton>
                                <IconButton onClick={() => navigate('/update/' + post.id)}><EditSharpIcon /></IconButton>
                            </>
                        }
                    </div>
                    <div>
                        <div >
                            <IconButton><ThumbUpOffAltSharpIcon onClick={handleLike} /></IconButton>
                            {post && <span>: {post?.likes.length}</span>}
                        </div>
                    </div>
                    {txt && <Alerts txt={txt} err={false} />}
                </div>
            </div>

        </div>
    )




}

