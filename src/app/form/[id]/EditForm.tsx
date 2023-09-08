"use client"
import Card from '@/components/Card';
import UserForm from '@/components/UserForm';
import React, { useState, useEffect } from 'react'
import { db, IUserForm } from '@/resources/database.config';
import { updateItem } from '@/app/actions';
import { useRouter, notFound } from 'next/navigation';
import Loading from '../loading';

/**
 * This component is a client component which displays an edit form to allow users to edit an item in IndexedDB.
 * @param param0 id - id slug of the item that's being looked at.
 * @returns A React component
 */
export default function EditForm({id}: {id: string}) {
    // Variables used for function component
    const router = useRouter();
    const [item, setItem] = useState<IUserForm | null | 'loading'>('loading');

    // On render fetch the item from IndexedDB - if it can't be found then return null to indicate it doesn't exist
    useEffect(() => {
        async function fetchItem() {
            const itemId = Number(id);

            if(isNaN(itemId)) {
                setItem(null);
                return;
            }

            const fetchedItem: IUserForm | undefined = await db.get(itemId);
            if (fetchedItem) {
                setItem(fetchedItem);
            } else {
                setItem(null);
            }
        }

        fetchItem();
    }, [id]);

    // redirect user back to previous page when they click go back button
    const handleBackClick = () => {
        router.back();
    }

    /**
     * This component returns an edit form for the item that the user is looking at
     * @param param0 item - object of IUserForm Type
     * @returns React Component
     */
    const EditFormItem: React.FC<{ item: IUserForm}> = ({ item }) => {
        // variables used for this component
        const [sensorIds, setSensorIds] = useState<string[]>(item.sensor_ids);
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
                router.back();
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

        // Return Edit Form Components
        return(
            <div>
                <h1 className='graph_info_title'>{item.batch_name}</h1>
                <button className='edit-form-btn' onClick={resetFields}>Reset Values</button>
                {/* Display error message above form if there are any */}
                {message === 'Validation errors' && formErrors !== null && (
                    <div className='form-error-message text-center'>
                        <p>{message}:</p>
                        {formErrors.map(error => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
                
                <div className='flex flex-col items-center justify-center text-center'>
                    <UserForm formData={formData} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} sensorIds={sensorIds} setSensorIds={setSensorIds}/>
                </div>
            </div>
        );
    };

    // Return Loading component if item is still being fetched
    if (item === 'loading') {
        return <Loading /> 
    }
    // Return notFound() page
    if (item === null) {
        return notFound(); 
    }

    // Display a form to the user showing the current details stored for this item - allowing them to make changes
    return(
        <div className='flex flex-col flex-1 items-center text-center justify-center'>       
            <Card>
                <button onClick={handleBackClick} className="edit-form-btn mr-auto">
                    Go Back
                </button>
                <EditFormItem item={item}/>
            </Card>
        </div>
        
    )
}
