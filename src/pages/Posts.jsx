import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { readPosts } from '../utility/crudUtility'
import { Categories } from '../components/Categories'
import { useSearchParams } from 'react-router-dom'
import { SingleCard } from '../components/SingleCard'
import { SearchBox } from '../components/SearchBox'

export const Posts = () => {

    const [searchParams] = useSearchParams()
    const [posts, setPosts] = useState(null)
    const [selcateg, setSelCateg] = useState(searchParams.get("ctg") ? [searchParams.get("ctg")] : [])

    console.log("url paraméter: ", searchParams.get("ctg"));


    useEffect(() => {
        readPosts(setPosts, selcateg)
    }, [selcateg])

    return (
        <div className='postpage'>

            <h1>Posztok</h1>

                <Categories selcateg={selcateg} setSelCateg={setSelCateg} />
                {posts && <SearchBox items={posts.map(obj=>({id:obj.id, name:obj.title}))}/>}

            <div className="posts">
                {posts && posts.map((obj) => <SingleCard {...obj} key={obj.id} />)}
            </div>


        </div>
    )
}

