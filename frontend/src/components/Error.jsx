import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError();
    // console.error(err);
  return (
    <div className='mt-10'>
        <h1 className='text-center font-bold text-2xl'>Oops!</h1>
        <h2 className='text-center text-2xl font-bold'>Something went wrong</h2>
        <h2 className='text-center text-2xl font-bold'>{err.status}: {err.statusText}</h2>
    </div>
  )
}

export default Error
