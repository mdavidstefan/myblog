import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import parse from "html-react-parser"
import { middleStyle } from '../utility/utils'
import { readSinglePost } from '../utility/crudUtility'


export const ReadPost = () => {

    const params = useParams()
    const navigate = useNavigate()
    console.log(params);
    const [post, setPost] = useState(null)

    useEffect(() => {
        readSinglePost(params.id, setPost)
    }, [])

    console.log(post);


    return (
        <div style={middleStyle}>
            {post && <>
                <img src={post.photo["url"]} alt={post.title} />
                <p>{parse(post.story)}</p>
            </>}
            <button className="btn btn-danger" onClick={() => navigate("/posts")} >go back</button>
        </div>
    )
}

