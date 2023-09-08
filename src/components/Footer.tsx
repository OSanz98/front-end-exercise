import Link from 'next/link';
import { ReactNode } from 'react';

// Set out data interface types for this component
type Props = {
    children: ReactNode,
    styling?: React.CSSProperties
}

/**
 * Display a footer component
 * @param children, styling - children can be any react component; styling - any additional styling user passes down
 * @returns 
 */
export default function Footer({ children, styling }: Props) {
  return (
    <div style={styling} className="bottom-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <ul className="flex flex-wrap text-center items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          {'Copyright © '} Oscar Sanz
          <a target="_blank" href="https://github.com/OSanz98?tab=repositories" rel="noopener noreferrer">
            <p className="hover:underline">
              {children}
            </p>
          </a>
        </li>
      </ul>
    </div>
  )
}
