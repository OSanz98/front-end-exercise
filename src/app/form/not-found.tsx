import Link from 'next/link'
import React from 'react'

/**
 *  Custom NotFound page when user tries to access an item that doesn't exist
 */ 
export default function NotFound() {
  return (
    <main className='flex flex-col flex-1 items-center justify-center text-center'>
        <h2 className='text-3xl'>There seems to be an issue.</h2>
        <p>We cannot find the item you were looking for</p>
        <p>Go back to <Link href="/form" className='text-blue-600 hover:text-blue-600/50 border-b-2 border-b-blue-600 hover:border-b-blue-600/50'>Form</Link></p>
    </main>
  )
}
