import React from 'react'
import { auth } from '../utility/firebaseApp'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState(null)

    console.log(msg);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [])

    const signInUser = async (email, password) => {
        setMsg(null)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setMsg({})
            setMsg({ signin: 'Sikeres bejelentkezés!' });
        } catch (error) {
            setMsg({ err: error.message })
        }
    }

    const signOutUser = async () => {
        await signOut(auth)
        setMsg({})
    }

    const signUpUser = async (email, password, displayName) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, { displayName })
            setMsg({})
            setMsg({ signup: 'Sikeres regisztráció!' })
        } catch (error) {
            setMsg({ err: error.message })
        }
    }

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email)
            setMsg({})
            setMsg({ resetPassword: 'A jelszóvisszaállítási email elküldve' })
        } catch (error) {
            setMsg({ err: error.message })
        }
    }

    return (
        <UserContext.Provider value={{ user, signInUser, signOutUser, msg, setMsg, signUpUser, resetPassword }}>
            {children}
        </UserContext.Provider>
    )
}