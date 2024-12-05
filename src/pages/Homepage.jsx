import React from 'react'
import { Category } from '../components/Card'
export const Homepage = () => {
    return (
        <div className='homepage'>
            <div className="cards">
                <Category category='Technológia' img_url='../public/technology.jpg' />
                <Category category='Étel' img_url='../public/food.jpg' />
                <Category category='Konyha' img_url='../public/kitchen.jpg' />
                <Category category='Szórakozás' img_url='../public/fun.jpg' />
            </div>
        </div>
    )
}

