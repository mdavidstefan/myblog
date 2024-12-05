import React from 'react'
import { middleStyle } from '../utils'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotFound } from './NotFound'

export const Profile = () => {
    const { user } = useContext(UserContext)
    if (!user) return <NotFound />


    return (
        <div className='page'>
            <div className="middleStyle">
                <h3>Felhasználói fiók beállítás</h3>
                <form>
                    <input type="text" name='displayName' />
                    <input type="file" name='' />
                </form>
            </div>
        </div>
    )
}

