import React from 'react';

/**
 * Display the Home Page - simple Welcome message
 * @returns React Component
 */
export default function AddData() {
    return (
        <main className='flex flex-1 items-center justify-center bg-gray-50 '>
            <div className='absolute left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
            <div className='absolute right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
            <div className='absolute bottom-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
            <h1 className='text-4xl'>Welcome to my Submission!</h1>
        </main>
    );
}
