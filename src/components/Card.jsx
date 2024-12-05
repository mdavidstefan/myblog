import React from 'react'
import { Card, CardBody, Button, CardImgOverlay, CardImg, CardText, CardTitle } from 'reactstrap'

export const Category = ({ img_url, category }) => {
    return (
        <div>
            <div>
                <Card inverse>
                    
                    <CardImg
                        alt="Card image cap"
                        src={img_url}
                        style={{
                            height: 270
                        }}
                        width="300px"

                    />
                    <CardImgOverlay>
                        <CardTitle tag="h5">
                            {category}
                        </CardTitle>
                    </CardImgOverlay>
                    <Button>
                        Olvass erről: {category}
                    </Button>
                </Card>
            </div>
        </div>
    )
}

