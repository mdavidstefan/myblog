import React, { useContext, useEffect } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { middleStyle } from '../utility/utils'

export const Auth = () => {
    const { user, signInUser, msg, setMsg, signUpUser } = useContext(UserContext)
    const navigate = useNavigate()

    const location = useLocation()
    const isSignIn = location.pathname == '/auth/in' //ha egyenlő, true értéket fog kapni

    useEffect(() => {
        setMsg(null)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault
        const data = new FormData(event.currentTarget)
        console.log(data.get('email'), data.get('password'), data.get('displayName'));
        if (isSignIn) {
            signInUser(data.get('email'), data.get('password'))
        } else {
            signUpUser(data.get('email'), data.get('password'), data.get('displayName'))
        }
    }

    return (
        <div className='page'>
            <div style={middleStyle} className='responsivediv' id='authdiv'>
                <h3>{isSignIn ? 'Bejelentkezés' : 'Regisztráció'}</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label >Email </Label>
                        <Input name="email" placeholder="email" type="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label > Jelszó </Label>
                        <Input name="password" placeholder="jelszó" type="password" />
                    </FormGroup>
                    {!isSignIn &&
                        <FormGroup>
                            <Label > Username </Label>
                            <Input name="displayName" type="text" />
                        </FormGroup>
                    }

                    <div>
                        <a href="#" onClick={() => navigate('/pwreset')} style={{color: '#ffffff'}}>Elfelejtett jelszó?</a>
                    </div>
                    <div className='responsivediv'>
                        <Button style={{ width: '100%', marginTop: '10px', backgroundColor: '#274046', color: '#e6dada' }}> Submit </Button>
                    </div>
                </Form>


                {msg && <Toastify {...msg} />}
            </div>
        </div>
    )
}

