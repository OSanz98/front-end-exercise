import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CompanyLogo from './blakbearLogo.png'

export default function Navbar() {
  return(
    <nav className="flex items-center bg-black shadow-lg p-4">
      <Link href='/' className='ml-10'>
          <Image src={CompanyLogo} alt="BlakBear logo" width={250} quality={100} placeholder='blur' />
      </Link>
      
      <Link href="/form" className='ml-auto text-white hover:text-white/60 px-4 py-2 inline-block hover:border-b-2 hover:border-white/60 transition-all'>
          Form
      </Link>
      <Link href="/display-graph" className='mr-10 text-white hover:text-white/60 px-4 py-2 inline-block hover:border-b-2 hover:border-white/60 transition-all'>
          View Graphs
      </Link>
    </nav>
  )
}