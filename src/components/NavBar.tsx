import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CompanyLogo from './blakbearLogo.png'
import NavLink from './NavLink'
import MobileNavMenu from './MobileNavMenu'

export default function Navbar() {
  return(
    <nav className="flex items-center bg-black shadow-lg p-4">
      <Link href='/' className='ml-10 mr-auto'>
          <Image src={CompanyLogo} alt="BlakBear logo" width={250} quality={100} placeholder='blur' />
      </Link>
      
      <div className='hidden md:flex'>
        <NavLink href='/form'>
          Form
        </NavLink>
        <NavLink href='/display-graph'>
          View Graphs
        </NavLink>
      </div>
      <div className='md:hidden'>
        <MobileNavMenu />
      </div>
      
    </nav>
  )
}