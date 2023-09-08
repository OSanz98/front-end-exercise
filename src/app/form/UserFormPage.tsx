"use client"
import React, {useState } from 'react'
import { addForm } from '../actions'
import ReusableItemBtn from '@/components/ReusableItemBtn'
import UserForm from '@/components/UserForm'


/**
 * Returns and displays a React Component showing a User Form where a user can create and submit a form.
 */
export default function UserFormPage() {
    const [message, setMessage] = useState<string>(''); //store status message for form submission responses
    const [formErrors, setFormErrors] = useState<string[]>([]); //store any error messages received from form submission responses
    const [sensorIds, setSensorIds] = useState<string[]>([]); //store all sensor ids entered into form
    const [formData, setFormData] = useState({
        batch_name: '',
        temperature: '',
        spoilage: '',
        test_date: ''
    }); // store form data - this allows us to clear all fields if user wants to.
   
    /**
     * when user clicks submit button it appends values entered in the field to FormData
     * used by addForm function in actions.ts file.
     * The response from the addForm is stored into res, and any messages are stored into
     * respective variables.
     */
    async function onCreate(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const form = new FormData();
        form.append("batch_name", formData.batch_name);
        form.append("temperature", formData.temperature);
        form.append("spoilage", formData.spoilage);
        form.append("test_date", formData.test_date);
        form.append("sensor_ids", JSON.stringify(sensorIds));

        const res = await addForm(form);
        setMessage(res.body.message);
        if(res.body.errors) {
            setFormErrors(res.body.errors)
        }
        if(res.status === 200){
            setFormData({
                batch_name: '',
                temperature: '',
                spoilage: '',
                test_date: ''
            });
            setSensorIds([]);
        }
    }

    /**
     * When a user enters a value or edits a value on a field,
     * it's value is updated in the respective form variable.
     * If there any error or success messages then they are reset.
     * @param e - html component
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setMessage('');
    }

    /**
     * clearForm is used to clear all form input fields and messages
     * present in the form.
     */
    const clearForm = () => {
        setFormData({
            batch_name: '',
            temperature: '',
            spoilage: '',
            test_date: ''
        });
        setSensorIds([]);
        setMessage('');
    }

    // hasData is used to check if a value has been entered in any input field - for clear button.
    const hasData = !!Object.values(formData).join('') || sensorIds.length;

    // Return UserForm page
    return (
        <>  
            <h1>User Form</h1>
            <p>Please fill out all fields in this form.</p>
            <p>You may add up to 10 values for temperature and spoilage.</p>
            {message === 'Successfully added'  && (
                <p className='form-success-message'>{message}</p>
            )}
            {message === 'Validation errors' && formErrors !== null && (
                <div className='form-error-message'>
                    <p>{message}:</p>
                    {formErrors.map(error => (
                        <p key={error}>{error}</p>
                    ))}
                </div>
            )}
            <UserForm formData={formData} handleFormSubmit={onCreate} handleInputChange={handleInputChange} sensorIds={sensorIds} setSensorIds={setSensorIds}/>
            
            <div>
                <ReusableItemBtn link='/display-graph' btnText='View Graphs'/>
            </div>
            
        </>
    )
}
