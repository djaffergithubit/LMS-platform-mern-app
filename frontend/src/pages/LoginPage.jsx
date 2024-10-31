import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';
import { useDispatch } from 'react-redux';
import { setToken } from '../states/authTokenSlice';
import { toast } from 'react-toastify';

function LoginPage() {

  const Navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    console.log(watch());
    const logIn = async () => {
        await axios.post('http://localhost:5000/users/login', {email:data.email, password:data.password})
        .then((response) => {
            console.log(response.data.token);
            dispatch(setToken(response.data.token))
            toast.success(`Welcome Back ${response.data.username}!`, {
              position: 'top-center'
            }
            )
            setTimeout(() => {
              Navigate('/')
            }, 2000)
        })
        .catch(err => {
            toast.error("Something went wrong!", {
              position: "top-center"
            })
            console.log(err);  
        })
    };
    
    logIn()
  }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4 ">
            <div className=" max-w-sm w-full text-gray-600 bg-white p-6 rounded-xl shadow-2xl">
                <div className="text-center">
                    <div className=" space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign in</h3>
                        <p className="">Don't you have an account yet? <a href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">Register</a></p>
                    </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-5 w-full"
                  noValidate
                >
                    <div className='mt-1.5'>
                        <label className="font-medium flex items-center">
                            Email
                            <span className=' text-red-600 text-xl flex items-center justify-center ml-1'>*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full sm:mt-2 mt-0.5 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            {...register('email', {
                              required: {
                                value: true,
                                message: 'field is required'
                              },
                              pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'invalid email address'
                              }
                            })}
                            placeholder='Enter your email'
                        />
                        {errors.email && <span className=' text-xs text-red-600 font-medium'>{errors.email?.message}</span>}
                    </div>
                    <div className=' mt-1.5'>
                        <label className="font-medium flex items-center">
                            Password
                            <span className=' text-red-600 text-xl flex items-center justify-center ml-1'>*</span>
                        </label>
                        <input
                            type="password"
                            {...register('password', {
                              required: {
                                value: true,
                                message: 'field is required'
                              },
                              minLength: {
                                value: 6,
                                message: 'password must be at least 6 characters'
                              }
                            })}
                            className="w-full sm:mt-2 mt-0.5 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            placeholder='Enter your password'
                        />
                        {errors.password && <span className=' text-xs font-medium text-red-600'>{errors.password?.message}</span>}
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        type='submit'
                    >
                        Sign in
                    </button>
                </form>
                <Oauth />
            </div>
        </main>
    )
}

export default LoginPage;
