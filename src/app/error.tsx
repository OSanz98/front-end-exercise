"use client"

import React from 'react'

/**
 * If an error occurs on any page like 500 or 400 errors then the error is displayed in a nice format on this page
 * This helps to stop the application from crashing if it comes across those kind of errors.
 * @param error - a string message containing information about an error
 * @returns React Component.
 */
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
