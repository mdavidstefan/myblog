import React from 'react'
import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { useEffect } from 'react'
import { middleStyle } from '../utils'

export const Auth = () => {
    const { user, signInUser, msg, setMsg, signUpUser } = useContext(UserContext)
    const navigate = useNavigate()

    const location = useLocation()
    console.log(location.pathname);
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

    console.log(user);


    return (
        <div className='page'>
            <div style={middleStyle}>
                <h3>{isSignIn ? 'Sign in' : 'Sign up'}</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label > Email </Label>
                        <Input name="email" placeholder="email" type="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label > Password </Label>
                        <Input name="password" type="password" />
                    </FormGroup>
                    {!isSignIn &&
                        <FormGroup>
                            <Label > Username </Label>
                            <Input name="displayName" type="text" />
                        </FormGroup>
                    }

                    <Button> Submit </Button>
                </Form>
                <a href="#" onClick={() => navigate('/pwreset')}>Forgotten password</a>

                {msg && <Toastify {...msg} />}
            </div>
        </div>
    )
}

