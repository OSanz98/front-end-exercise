"use client"

import React from 'react'
import { db, IUserForm } from '../../resources/database.config'
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';

/**
 * ItemList returns a React Component showing all current items stored in IndexedDB and allow them to delete items
 * or edit items - in which case it will direct user to the edit page.
 */
export default function ItemList() {
    const allItems = useLiveQuery(() => db.toArray(), []) as IUserForm[] | undefined;

    const handleDelete = async (id: number) => {
        await db.delete(id);
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
