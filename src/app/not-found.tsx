import Link from 'next/link'
import React from 'react'

/**
 * Display custom not-found page overriding default Next.js not found page.
 * @returns React Component
 */
export default function NotFound() {
  return (
    <main className='flex flex-col flex-1 items-center justify-center text-center'>
        <h2 className='text-3xl'>There was a problem.</h2>
        <p>We cannot find the page you were looking for</p>
        <p>Go back to the <Link href="/" className='text-blue-600 hover:text-blue-600/50 border-b-2 border-b-blue-600 hover:border-b-blue-600/50'>Home</Link></p>
    </main>
  )
}