"use client"
import Card from '@/components/Card';
import UserForm from '@/components/UserForm';
import React, {useState} from 'react'

import { db, IUserForm } from '@/resources/database.config';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateItem } from '@/app/actions';

export default function EditForm({id}: {id: string}) {

    const allItems = useLiveQuery(() => db.toArray(), []) as IUserForm[];
    const item = allItems.find((val) => val.id === Number(id))
    
   
    // const item: IUserForm = useLiveQuery(() => {
    //     if(!id) return null;
    //     return db.get(Number(id))
    // }, [id]);

    console.log(item);


    const [sensorIds, setSensorIds] = useState<string[]>(item.sensor_ids); //store all sensor ids entered into form
    const [formData, setFormData] = useState({
        batch_name: item.batch_name,
        temperature: item.temperature.toString(),
        spoilage: item.spoilage.toString(),
        test_date: item.test_date
    });
    const [message, setMessage] = useState('');
    const [formErrors, setFormErrors] = useState<string[]>([]);

    /**
     * Called when user clicks submit button on the form.
     * Call updateItem to try to update the item, and check response returned.
     * If successful, hide form and show info div again and reset message and form errors.
     * @param e react form event
     */
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        form.append("batch_name", formData.batch_name);
        form.append("temperature", formData.temperature);
        form.append("spoilage", formData.spoilage);
        form.append("test_date", formData.test_date);
        form.append("sensor_ids", JSON.stringify(sensorIds));
        // Save to indexedDB using Dexie.js
        const res = await updateItem(form, item.id);
        if(res.status !== 200) {
            setMessage(res.body.message);
            if(res.body.errors) {
                setFormErrors(res.body.errors);
            }
        } else {
            setMessage('');
            setFormErrors([]);
        }
        
    };

    /**
     * resetFields is used to reset the form values to what they should be.
     * Also resets any other variables such as messages, error messages etc.
     */
    const resetFields = () => {
        setSensorIds(item.sensor_ids);
        setMessage('');
        setFormErrors([]);
        setFormData({
            batch_name: item.batch_name,
            temperature: item.temperature.toString(),
            spoilage: item.spoilage.toString(),
            test_date: item.test_date
        })
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

    return(
        <Card>
            <h1 className='graph_info_title'>{item.batch_name}</h1>
            {/* Display error message above form if there are any */}
            {message === 'Validation errors' && formErrors !== null && (
                <div className='form-error-message text-center'>
                    <p>{message}:</p>
                    {formErrors.map(error => (
                        <p>{error}</p>
                    ))}
                </div>
            )}
            <div className='flex flex-col items-center justify-center text-center'>
                <UserForm formData={formData} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} sensorIds={sensorIds} setSensorIds={setSensorIds}/>
            </div>
        </Card>
    )
}
