"use client"
import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className='form-submit' disabled={pending}>
            {pending && <span>Submitting...</span>}
            {!pending && <span>Submit</span>}
        </button>
    )
}
