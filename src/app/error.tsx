"use client"

import React from 'react'


export default function error({error, reset} : {error: Error, reset: () => void}) {
  return (
    <main className="text-center flex flex-col mt-20">
        <h2 className="text-4xl">Oh No!</h2>
        <p>{error.message}</p>
        <button
            onClick={reset}
            className='btn-primary mx-auto my-4'
        >
            Please try again.
        </button>
    </main>
  )
}
