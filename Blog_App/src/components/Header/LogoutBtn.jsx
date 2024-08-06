import React from 'react'
import {useDispatch} from 'react-redux'
// may have error
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import {useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            navigate('/login')
        })
    }
  return (
    <button className='text-white inline-block px-6 py-2 duration-200 hover:bg-neutral-300 hover:text-neutral-950 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn
