import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { TypeAnimation } from 'react-type-animation'
import { middleStyle } from '../utility/utils'
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
                        'Konyha',
                        1000,
                        'Szórakozás',
                        1000,
                        'Technológia',
                        1000,
                        'Étel',
                        1000
                    ]}
                    speed={50}
                    style={{ fontSize: '2em' }}
                    repeat={Infinity}
                />
            </div>
            */
            <div className="categories">

                {categories && categories.map(obj =>
                    <Card key={obj.id} style={{ width: '18rem' }}>
                        <img alt={obj.name} src={obj.photoUrl} style={{ width: '18rem', aspectRatio: '9/16', objectFit: 'cover' }} />
                        <CardBody style={{ backgroundColor: '#e6dada' }}>
                            <CardTitle tag="h5" style={{ textAlign: 'center' }}>
                                {obj.name}
                            </CardTitle>
                        </CardBody>
                    </Card>
                )}
            </div>
            
        </div>
    )
}

