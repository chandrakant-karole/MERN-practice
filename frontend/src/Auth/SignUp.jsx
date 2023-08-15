import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [UserDetails, setUserDetails] = useState({})
    const redirect = useNavigate()

    const Register = async () => {
        const result = await fetch('http://localhost:8000/register', {
            method: 'POST',
            body: JSON.stringify(UserDetails),
            headers: {
                'content-Type': "application/json"
            }
        })
        const data = await result.json()
        if (data?._id) {
            localStorage.setItem("user",JSON.stringify(data))
            redirect('/')
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            redirect('/')
        }
    }, [])


    return (
        <>
            <div className='signUp'>
                <h2>Register</h2>

                <input type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Name' name="name" id="name" />
                <input type="email" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Email' name="email" id="email" />
                <input type="password" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Password' name="password" id="password" />
                <button className='submit' onClick={Register}>Submit</button>
            </div>
        </>
    )
}
