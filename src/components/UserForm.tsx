"use client"

import React from 'react'
import TagInput from './TagInput'
import SubmitButton from './SubmitButton'

// UserFormData is used to set out the types for form data
type UserFormData = {
    batch_name: string,
    temperature: string, 
    spoilage: string,
    test_date: string
}

// Props is used to specify the types of all params passed to the component.
type Props = {
    formData: UserFormData,
    handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    sensorIds: string[],
    setSensorIds: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * This is a reusable form component which is used throughout the application. It returns a form to allow the user
 * to create and perform manipulations on items. 
 * @param formData, handleFormSubmit, handleInputChange, sensorIds, setSensorIds 
 * @returns React Component
 */
export default function UserForm({formData, handleFormSubmit, handleInputChange, sensorIds, setSensorIds}: Props) {
    return (
        <form onSubmit={handleFormSubmit} className="user-form">
            <div className='form-component'>
                <div className='flex flex-row justify-between'>
                    <label htmlFor="batchTitle">Please name the Batch:</label>
                    
                </div>
                
                <input
                    required
                    type="text"
                    name="batch_name"
                    id="batch_name"
                    className="form-input"
                    onChange={handleInputChange}
                    value={formData.batch_name}
                />
            </div>
            
            <div className='form-component'>
                <label htmlFor="sensors" >Please input or select all sensor IDs:</label>
                <TagInput tags={sensorIds} setTags={setSensorIds} />
            </div>
            
            <div className='form-component'>
                <label htmlFor="temperature">Enter up to 10 values for temperature:</label>
                <input
                    required
                    type="text"
                    name="temperature"
                    id="temperature"
                    className="form-input"
                    onChange={handleInputChange}
                    value={formData.temperature}
                />
            </div>

            <div className='form-component'>
                <label htmlFor="spoilage">Enter up to 10 values for spoilage (0-10):</label>
                <input
                    required
                    type="text"
                    name="spoilage"
                    id="spoilage"
                    className="form-input"
                    onChange={handleInputChange}
                    value={formData.spoilage}
                />
            </div>

            <div className='form-component'>
                <label htmlFor="date">Select the start date:</label>
                <input
                    required
                    type="date"
                    name="test_date"
                    id="test_date"
                    className="form-input"
                    onChange={handleInputChange}
                    value={formData.test_date}
                />
            </div>

            <SubmitButton />
        </form>
    );
}
