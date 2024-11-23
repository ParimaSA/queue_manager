"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { signIn } from "next-auth/react";
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect if the user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
        auth.login()
        router.replace('/business')
    }
  })

    return (
      <>
      <div className='flex justify-center items-center min-h-screen'>
        <div className="card bg-base-100 lg:w-[60vw] md:w-[50vw] sm:w-[50vw] bg-lightPurple6 h-[80vh] shadow-xl flex justify-center items-center">
          <div className="card-body flex flex-col justify-center items-center">
            <label className='text-4xl text-center text-darkPurple2 font-bold'>Login</label>
            <button onClick={() => signIn("google")} className='btn btn-primary lg:w-[40vw] md:w-[40vw] sm:w-[40vw] mt-8 bg-white text-black text-base border-none hover:bg-purple-300'>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 50 40"
              fill="currentColor"
              className="h-5 w-5 opacity-70">
              <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>Sign in with Google</button>
            <div className="flex items-center justify-center mt-8 w-full">
              <hr className="flex-grow border-gray-300 border-t" />
              <span className="px-4 text-gray-500 text-lg">OR</span>
              <hr className="flex-grow border-gray-300 border-t" />
            </div>
            <LoginForm>
            </LoginForm>
          </div>
        </div>
      </div>
      </>
  );
}

export default LoginPage;