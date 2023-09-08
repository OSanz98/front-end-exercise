"use client"

import React from 'react'
import { db, IUserForm } from '../../resources/database.config'
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';

export default function ItemList() {
    const allItems = useLiveQuery(() => db.toArray(), []) as IUserForm[] | undefined;

    const handleDelete = async (id: number) => {
        await db.delete(id);
    }

    const CreateLink = (id: number) => {
        
        const href = `/form/${id}`
        return(
            <Link href={href} className='items-edit-btn'>
                Edit
            </Link>
        )
    }

    return (
        <>
            {allItems !== undefined && allItems.length > 0 && (
                <main>
                    <div className='divider'></div>
                    <div className="items-list">
                        {allItems?.map((item) => (
                            <div className="items-row" key={item.id}>
                                <span className='mr-auto'>{item.batch_name}</span>
                                <Link href={item.id ? `/form/${item.id}` : '/form'} className='items-edit-btn'>
                                    Edit
                                </Link>
                                <button className="items-btn" onClick={() => handleDelete(item.id as number)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </main>
            )}
        </>
    )
}
