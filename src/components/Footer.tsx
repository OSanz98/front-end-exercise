import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

export default function Footer({ children }: Props) {
  return (
    <div className="relative bottom-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <ul className="flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <p className="mr-4 hover:underline md:mr-6 ">
            Submission created by {children}
          </p>
        </li>
      </ul>
    </div>
  )
}
