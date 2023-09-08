import React from 'react'

/**
 * This function allows us to render a loading state on the website when invoked.
 * Helps to keep a clean interface, letting user know that something is loading.
 */
export default function Loading() {
  return (
    <main className='flex flex-col flex-1 items-center justify-center text-center'>
        <h2 className='text-primary'>Loading...</h2>
        <p>Hopefully not for too long:)</p>
    </main>
  )
}