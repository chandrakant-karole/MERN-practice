import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [UserDetails, setUserDetails] = useState({})
    const UserLogin = async () => {
        let result = await fetch('http://localhost:8000/login', {
            method: "POST",
            body: JSON.stringify(UserDetails),
            headers: {
                'content-Type': 'application/json'
            }
        })
        let data = await result.json()
        console.log(data);
        if(data.name){
            localStorage.setItem("user",JSON.stringify(data))
            navigate('/')
        }else{
            alert('please enter correct details')
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [])
    return (
        <>
            <div className='signUp'>
                <h2>Login</h2>
                <input type="email" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Email' name="email" id="email" />
                <input type="password" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Password' name="password" id="password" />
                <button className='submit' onClick={UserLogin}>Login</button>
            </div>
        </>
    )
}
