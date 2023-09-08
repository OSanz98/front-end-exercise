
"use client"

import React, {ReactNode} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

// set out data types for props/params passed to component
type Props = {
    href: string,
    children: ReactNode
}

/**
 * This is used to create a next.js Link component
 * @param href, children - href: the url we want the link to navigate to; children: any react component 
 * @returns A Next.js Link Component
 */
export default function NavLink({href, children}: Props) {
    // used to get the current path in the url
    const currentRoute = usePathname();
    
    // used for styling an active page in navigation bar
    const isActive = currentRoute === href;
    // display a next link component.
    return (
        <Link href={href} className={isActive ? 
            'text-white border-b-2 font-bold px-4 py-2 inline-block hover:text-white/60 hover:border-white/60 transition-all' 
        : 'text-white hover:text-white/60 px-4 py-2 inline-block hover:border-b-2 hover:border-white/60 transition-all'}>
            {children}
        </Link>
    )
}
