import React, {useState} from "react";
import authService from "../appwrite/auth";
import {Link, useNavigate} from 'react-router-dom'
import { login } from "../store/authSlice";
import {Button, Input, Logo} from './index'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const create = async(data)=>{
        setError("")
        try {
            const userData =  await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData)dispatch(login(userData))
                setTimeout(()=>(navigate("/")),0)
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">
                Create a new Account 
            </h2>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className="space-y-5">
                    <Input 
                    label="Full Name: "
                    placeholder="Enter your Full Name"
                    {...register("Name",{
                        required : true
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required : true,
                        validate : {
                            //matchPatern
                            matchPattern : (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your Password"
                    {...register("password",{
                        required : true
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full transition ease-in-out delay-10 bg-blue-500 hover:scale-105 hover:bg-blue-900 duration-200 active:bg-blue-300"
                    children="Create Account"
                    ></Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
