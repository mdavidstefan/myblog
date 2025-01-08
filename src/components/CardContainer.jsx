import React from 'react'
import { SingleCard } from './SingleCard'
import { middleStyle } from '../utility/utils'

export const CardContainer = ({ posts, setPosts }) => {



    return (
        <div style={{ display: 'flex', flexDirection: "row", margin: "100px", justifyContent: "center", alignItems: "center" }}>
            {posts && posts.map((obj) => <SingleCard {...obj} key={obj.id} />)}
        </div>
    )
}

