"use client"

import React, {useState, useRef} from 'react'
import Link from 'next/link';
import { useOnClickOutside } from 'usehooks-ts';

export default function MobileNavMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(sidebarRef, (e) => {
        setIsMobileMenuOpen(false);
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <>
            <button
                onClick={toggleMobileMenu}
                className='text-xl text-white hover:text-gray-300 focus:outline-none menu-btn mr-5'
            >
                ☰
            </button>

            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 mobile-nav-menu z-50">
                <div className="bg-gray-800 w-64 h-full p-4" ref={sidebarRef}>
                  <ul>
                    <li>
                        <Link onClick={closeMenu} href="/form" className='block text-white transition-all py-2 hover:text-white/50 hover:text-white hover:border-b-2 hover:border-b-white'>
                            Form
                        </Link>
                    </li>
                    <li>
                        <Link onClick={closeMenu} href="/display-graph" className='block text-white transition-all py-2 hover:text-white/50 hover:text-white hover:border-b-2 hover:border-b-white'>
                            View Graphs
                        </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
        </>
    )
}
