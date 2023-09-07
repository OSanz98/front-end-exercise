"use client"

import React from 'react'
import { db, IUserForm } from '../../resources/database.config'
import { useLiveQuery } from 'dexie-react-hooks';

export default function ItemList() {
    const allItems = useLiveQuery(() => db.toArray(), []) as IUserForm[] | undefined;

    const handleDelete = async (id: number) => {
        await db.delete(id);
    }

    const handleItemClick = () => {

    }

    return (
        <>
            {allItems !== undefined && allItems.length > 0 && (
                <main>
                    <div className='divider'></div>
                    <div className="items-list">
                        {allItems?.map((item) => (
                            <div className="items-row" key={item.id} onClick={handleItemClick}>
                                <span>{item.batch_name}</span>
                                <button className="items-btn" onClick={() => handleDelete(item.id as number)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </main>
            )}
        </>
    )
}
