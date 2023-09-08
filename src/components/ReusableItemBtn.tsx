"use client"

import React from 'react'
import { db, IUserForm } from '../resources/database.config'
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';

/**
 * Return and display a custom link button which directs user to another url on click.
 * @param link, btnText - link: an href string used for the Link; btnText is used to set the text of the button 
 * @returns 
 */
export default function ReusableItemBtn({link, btnText} : {link: string, btnText: string}){

    const allItems = useLiveQuery(() => db.toArray(), []) as IUserForm[] | undefined;
    const itemCount = allItems?.length || 0;

    return (
        <Link href={link}>
            <button disabled={itemCount === 0} className={itemCount === 0 ? 'reusable-btn-no-items' : 'reusable-btn-items'}>
                {btnText}
            </button> 
        </Link>
    );
} 
