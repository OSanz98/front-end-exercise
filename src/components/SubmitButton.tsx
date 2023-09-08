"use client"
import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

/**
 * Displays a custom button used in forms where the text changes to submitting... on press. 
 * Once the form action is complete then it returns to default text.
 * @returns React component
 */
export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className='form-submit' disabled={pending}>
            {pending && <span>Submitting...</span>}
            {!pending && <span>Submit</span>}
        </button>
    )
}
