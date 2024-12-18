import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignInPage() {

  const Navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log(watch());
    const registerUser = async (email, password, username) => {
      await axios.post('http://localhost:5000/users/register', {username: username, email:email, password:password})
      .then((response) => {
        toast.success('logged in successfully', {
          position: 'top-center'
        }
        )
        setTimeout(() => {
          Navigate('/log-in')
        }, 2000);
        console.log(response.data);
      })
      .catch((error) =>{
        toast.error('Something went wrong!', {
          position: 'top-center'
        }
        )
        console.log(error);
      })
    }
    
    await registerUser(data.email, data.password, data.username);
    
    register()
  }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4 ">
            <div className=" max-w-sm w-full text-gray-600 bg-white p-6 rounded-xl shadow-2xl">
                <div className="text-center">
                    <div className=" space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                        <p className="">Already have an account? <a href="/log-in" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a></p>
                    </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-5 w-full"
                  noValidate
                >
                    <div className=''>
                        <label className="font-medium flex items-center">
                            Username
                            <span className=' text-red-600 text-xl flex items-center justify-center ml-1'>*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2  px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            {...register('username', {
                              required: {
                                value: true,
                                message: 'field is required'
                              }
                            })}
                            placeholder='Enter your username'
                        />
                        {errors.username && <span className=' text-xs text-red-600 font-medium'>{errors.username?.message}</span>}
                    </div>

                    <div className=''>
                        <label className="font-medium flex items-center">
                            Email
                            <span className=' text-red-600 text-xl flex items-center justify-center ml-1'>*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full mt-2  px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
                    <div className=''>
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
                            className="w-full mt-2  px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            placeholder='Enter your password'
                        />
                        {errors.password && <span className=' text-xs font-medium text-red-600'>{errors.password?.message}</span>}
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 sm:mt-0 mt-4"
                        type='submit'
                    >
                        Create account
                    </button>
                </form>
                <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_17_40)">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </main>
    )
}

export default SignInPage;
