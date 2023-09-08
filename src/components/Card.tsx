import React from 'react'

/**
 * Reusable Component - displays a responsive card and shows any react components passed down in this card.
 * @param children - react components
 */
export default function Card({children} : {children: React.ReactNode}) {
    return (
        <div className="card">
            {children}
        </div>
    );
}
