"use client"


import React, { useState } from 'react'
import Card from '@/components/Card'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, Label, ResponsiveContainer } from 'recharts';
import { db, IUserForm } from '../../resources/database.config'
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { updateItem } from '../actions';
import TagInput from '@/components/TagInput'
import UserForm from '@/components/UserForm';
import Footer from '@/components/Footer';

type ChartData = {
    index: number,
    batch_name: string,
    date: string, 
    temperature: number, 
    spoilage: number,
    sensor_ids: string[]
};

export default function GraphItem() {
    const graphItems = useLiveQuery(() => db.toArray(), []) as IUserForm[] | undefined;
    const itemCount = graphItems?.length || 0;

    
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className="p-2 bg-white border shadow-lg">
              <p>{`Batch: ${payload[0].payload.batch_name}`}</p>
              <p>{`Sensor IDs: ${payload[0].payload.sensor_ids.join(', ')}`}</p>
              <p>{`Temperature: ${payload[0].payload.temperature}`}</p>
              <p>{`Spoilage: ${payload[0].payload.spoilage}`}</p>
            </div>
          );
        }
        return null;
    };

    const transformData = (item: IUserForm): ChartData[] => {
        const data:ChartData[] = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date(item.test_date)
            date.setDate(date.getDate() + i)
            const formattedDate = date.toISOString().split('T')[0];
            data.push({
                index: i,
                batch_name: item.batch_name,
                date: formattedDate,
                temperature: item.temperature[i] || 0,
                spoilage: item.spoilage[i] || 0,
                sensor_ids: item.sensor_ids
            })
        }
        return data;
    };


    /**
     * This function is used to display a form value in the form of a graph along with a display of it's attributes.
     * @param item The data for an object entered by the user on the form page
     * @returns a React component showing the data on a graph and it's relevant information
     */
    const SingleGraph: React.FC<{ item: IUserForm }> = ({ item }) => {
        const data = transformData(item);
        const minTemperature = Math.min(...data.map(item => item.temperature));
        const maxTemperature = Math.max(...data.map(item => item.temperature));

        // Ensure that we incorporate the spoilage range [0, 10]
        const yAxisDomain = [
            Math.min(minTemperature, 0),
            Math.max(maxTemperature, 10) + 1
        ];
        const allDates = data.map(item => item.date);
        
        // Display Responsive Graph showing item data in a suitable format
        return (
            <>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" ticks={allDates}>
                            <Label angle={0} offset={-10} position='insideBottom'>Days</Label>
                        </XAxis>
                        <YAxis yAxisId="left" orientation="left" domain={[0, 10]}>
                            <Label angle={-90} position='insideLeft' style={{fill: '#ff7300'}}>Spoilage</Label>
                        </YAxis>
                        <YAxis yAxisId="right" orientation="right" domain={yAxisDomain}>
                            <Label angle={90} position='insideRight' style={{fill: '#8884d8'}}>Temperature</Label>
                        </YAxis>
                        <Tooltip content={<CustomTooltip />}/>
                        <Area type="monotone" dataKey="temperature" yAxisId="right" stroke="#8884d8" fill="#8884d8" />
                        <Line type="monotone" dataKey="spoilage" yAxisId="left" stroke="#ff7300" />
                    </ComposedChart>
                </ResponsiveContainer>

                <GraphInfo item={item}/>
            </>
        );
    }

    /**
     * Used to render and display the chart information section - including details
     * about the item.
     * @param param0 item contains object data
     * @returns graph information component
     */
    const GraphInfo: React.FC<{ item: IUserForm }> = ({ item })=> {
        // State variables used for the GraphInfo component
        const [editMode, setEditMode] = useState(false);
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
                setEditMode(false);
                setMessage('');
                setFormErrors([]);
            }
            
        };

        /**
         * resetFields is used to reset the form values to what they should be.
         * Also resets any other variables such as messages, error messages etc.
         */
        const resetFields = () => {
            setEditMode(!editMode)
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
            <div className='graph_info_card'>
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
                
                
                {editMode ? (
                    // If in edit mode then display form for item
                    <div className='flex flex-col items-center justify-center text-center'>
                        <UserForm formData={formData} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} sensorIds={sensorIds} setSensorIds={setSensorIds}/>
                    </div>
                ) : (
                    // if not in edit mode just display item information
                    <div className='graph_info_data'>
                        <div className='graph_info_data_col'>
                            <span>Day: {item.test_date}</span>
                            <span>Spoilage: {item.spoilage.join(', ')}</span>
                            <span>Temperature: {item.temperature.join(', ')}</span>
                        </div>
                        <div className='graph_info_data_col'>
                            <h1>Sensor Ids</h1>
                            {item.sensor_ids.map((sensor) => (
                                <p>- {sensor}</p>
                            ))}
                        </div>
                    </div>
                )}
                <button className={editMode ? 'graph-cancel-btn' : 'graph-edit-btn'} onClick={resetFields}>{editMode ? "Cancel" : "Edit"}</button>
            </div>
        )
    };
    
    return (
        <main>
            {/* If there are items to show in graphs then create graph and info for each */}
            {itemCount > 0 && graphItems && (
                <>
                    <div className='display-graph-page'>
                        {graphItems.map((item, idx) => (
                            <SingleGraph key={idx} item={item} />
                        ))}
                        
                    </div>
                    <Footer styling={{ position: 'relative' }}>Click me!</Footer>
                </>
                
            )}
            {/* If there aren't any items then display a card with text stating no items to show */}
            {itemCount === 0 && (
                <div className='flex justify-center text-center h-max'>
                    <Card>
                        <h1 className='text-5xl'>Sorry!</h1>
                        <p>There isn't any data to show at this point in time.</p>
                        <div className='flex-row items-center'>
                            <p>Please visit the form page to add items:</p>
                            <Link href='/form'>
                                <span className='go-to-form-page-link'>Go to Form Page</span>
                            </Link>
                        </div>
                    </Card>
                    <Footer styling={{ position: 'absolute' }}>Click me!</Footer>
                </div>
            )}
        </main>
    )
}
