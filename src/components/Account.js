import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export default function Account() {
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()
    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/')
        } catch (error) {
            setError('Failed to logout')
        }
    }
    return (
        <>
            {error && <p>{error}</p>}
            <p>{currentUser.email}</p>
            <p><button onClick={handleLogout}>Log Out</button></p>
        </>
    )
}
