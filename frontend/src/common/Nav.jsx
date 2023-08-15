import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Nav() {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user')
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/signup')
    }
    return (
        <>
            <div>
                {auth ?
                    <ul className='main_nav'>
                        <li><Link to='/'>Products</Link></li>
                        <li><Link to='/add'>Add Products</Link></li>
                        <li><Link to='/update'>Update Products</Link></li>
                        <li></li>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name} )</Link></li>
                    </ul>
                    :
                    <>
                        <ul className='main_nav'>
                            <li><Link to='/signup'>SignUp</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </>
                }
            </div>
        </>
    )
}
