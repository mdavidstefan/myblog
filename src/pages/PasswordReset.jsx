import React from 'react'
import { Button, FormGroup, Input, Label, Form } from 'reactstrap'
import { Toastify } from '../components/Toastify'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { middleStyle } from '../utils'

export const PasswordReset = () => {
    const { msg, resetPassword } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        resetPassword(data.get('email'));

    }

    return (
        <div className='page'>
            <div style={middleStyle}>
                <h3>Jelszó modosítása</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label > Email </Label>
                        <Input name="email" placeholder="email" type="email" />
                    </FormGroup>
                    <Button> Új jelszó igénylése </Button>
                </Form>
                {msg && <Toastify {...msg} />}
            </div>
        </div>
    )
}


