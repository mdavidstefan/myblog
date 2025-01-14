import React, { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { TypeAnimation } from 'react-type-animation'
import { NavLink } from 'react-router-dom'
export const Homepage = () => {

    const { categories } = useContext(CategContext)
    console.log(categories);

    return (
        <div className='responsivediv' id='homepage'>

            <TypeAnimation
                sequence={[
                    'Témák: Filozófia',
                    1000,
                    'Témák: Konyha',
                    1000,
                    'Témák: Szórakozás',
                    1000,
                    'Témák: Technológia',
                    1000
                ]}
                wrapper='span'
                speed={50}
                style={{ fontSize: '3em', display: 'inline-block' }}
                repeat={Infinity}
            />

            <div className="responsivediv" id='categories'>

                {categories && categories.map(obj =>
                    <Card key={obj.id} style={{ width: '18rem' }}>
                        <NavLink to={'/posts?ctg=' + obj.name}>
                            <img alt={obj.name} src={obj.photoUrl} style={{ width: '18rem', aspectRatio: '9/16', objectFit: 'cover' }} />
                            <CardBody style={{ backgroundColor: '#e6dada' }}>
                                <CardTitle tag="h5" style={{ textAlign: 'center', color: '#274046', textDecoration: 'none' }}>
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

