
"use client"

import React, {ReactNode} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

type Props = {
    href: string,
    children: ReactNode
}
export default function NavLink({href, children}: Props) {
    const currentRoute = usePathname();
    
    const isActive = currentRoute === href;
    return (
        <Link href={href} className={isActive ? 
            'text-white border-b-2 font-bold px-4 py-2 inline-block hover:text-white/60 hover:border-white/60 transition-all' 
        : 'text-white hover:text-white/60 px-4 py-2 inline-block hover:border-b-2 hover:border-white/60 transition-all'}>
            {children}
        </Link>
    )
}
