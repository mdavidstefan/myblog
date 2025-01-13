import React, { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { TypeAnimation } from 'react-type-animation'
import { NavLink } from 'react-router-dom'
export const Homepage = () => {

    const { categories } = useContext(CategContext)
    console.log(categories);

    return (
        <div className='homepage'>

            <div className="text">
                <TypeAnimation
                    sequence={[
                        'Welcome to my blog',
                        1000,
                        'Filozófia',
                        1000,
                        'Konyha',
                        1000,
                        'Szórakozás',
                        1000,
                        'Technológia',
                        1000
                    ]}
                    speed={50}
                    style={{ fontSize: '2em' }}
                    repeat={Infinity}
                    preRenderFirstString={true}
                />
            </div>

            <div className="categories">

                {categories && categories.map(obj =>
                    <Card key={obj.id} style={{ width: '18rem' }}>
                        <NavLink to={'/posts?ctg=' + obj.name}>
                            <img alt={obj.name} src={obj.photoUrl} style={{ width: '18rem', aspectRatio: '9/16', objectFit: 'cover' }} />
                            <CardBody style={{ backgroundColor: '#e6dada' }}>
                                <CardTitle tag="h5" style={{ textAlign: 'center', color:'#274046' }}>
                                    {obj.name}
                                </CardTitle>
                            </CardBody>
                        </NavLink>
                    </Card>
                )}
            </div>

        </div>
    )
}

