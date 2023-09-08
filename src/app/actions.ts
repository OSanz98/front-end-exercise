/** 
 * 'use server' -> if we were using a server component to call these functions and dealing with a database connection
 * then it would be better to use server functions instead and then call revalidatePath and redirect
*/
import { z } from 'zod';
import { db, IUserForm } from '../resources/database.config';

// Helper function to convert comma-separated string to number array for temperatures
const convertToFloatArray = (value: string): number[] => value.split(',').map(num => parseFloat(num.trim()));

// Helper function to convert comma-separated string to integer array for spoilage
const convertToIntegerArray = (value: string): number[] => value.split(',').map(num => parseInt(num.trim(), 10));

/**
 * custom schema used for checking temperature data - checking it meets the relevant requirements
 */
const temperatureSchema = z.string()
    .transform(convertToFloatArray)
    .refine(values => values.length >= 1 && values.length <= 10, {
        message: "You must provide between 1 and 10 temperature values."
    })
    .refine(values => values.every(val => {
        const decimalCount = (val.toString().split('.')[1] || '').length;
        return decimalCount === 5;
    }), {
        message: 'Each temperature value must have exactly 5 decimal places'
});

/**
 * custom schema used for checking spoilage data - checking it meets the relevant requirements
 */
const spoilageSchema = z.string()
    .transform(convertToIntegerArray)
    .refine(values => values.length >= 1 && values.length <= 10, {
        message: "You must provide between 1 and 10 spoilage values."
    })
    .refine(values => values.every(val => Number.isInteger(val) && val >= 0 && val <= 10), {
        message: 'Each spoilage value must be a whole number between 0 and 10.'
});

/**
 * A schema created to be used to check form data validity
 */
const formSchema = z.object({
    batch_name: z.string().nonempty('You must provide a batch name'),
    test_date: z.string().nonempty('Date must not be empty'),
    temperature: temperatureSchema,
    spoilage: spoilageSchema,
    sensor_ids: z.array(z.string())
        .min(1, 'At least one sensor ID is required.')
        .max(10, 'You can provide up to 10 sensor IDs only.')
        .nonempty('Sensor IDs cannot be empty.')
    
})
.refine(data => data.temperature.length === data.spoilage.length, {
    message: 'You must enter the same amount of values for temperature and spoilage.'
});

/**
 * This function is used to validate a user request from a form submission - checking all data entered meets the requirements.
 * If checks are sucessful, then add to the IndexedDB - otherwise display any check errors.
 * @param formData data from a form
 * @returns http response object
 */
export async function addForm(formData: FormData){
    try {
        
        const parsed:IUserForm = formSchema.parse({
            batch_name: formData.get('batch_name'),
            test_date: formData.get('test_date'),
            temperature: formData.get('temperature'),
            spoilage: formData.get('spoilage'),
            sensor_ids: JSON.parse(formData.get('sensor_ids') as string)
        })

        // Check if a batch_name already exists in the IndexedDB
        const existingItem = await db.where('batch_name').equals(parsed.batch_name).first();
        if(existingItem) {
            return { status: 409, body: { message: 'Validation errors', errors: ['An item with this batch name already exists.'] }};
        }

        await db.add(parsed)

        return { status: 200, body: { message: `Successfully added ${parsed.batch_name}` }}
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(e => e.message);

            return { status: 400, body: { message: 'Validation errors', errors: errorMessages }};
        }
        return {status: 500, body: { message: 'Internal Server Error'}};
    }
    
}

/**
 * This function is used to update an existing item.
 * @param formData, id - formData contains data from a form submission, id is the id of the item being updated
 * @returns http response object
 */
export async function updateItem(formData: FormData, id?: number) {
    try {
        const parsed:IUserForm = formSchema.parse({
            batch_name: formData.get('batch_name'),
            test_date: formData.get('test_date'),
            temperature: formData.get('temperature'),
            spoilage: formData.get('spoilage'),
            sensor_ids: JSON.parse(formData.get('sensor_ids') as string)
        })
        
        // Check if there is already an item with that batch_name
        const existingItem = await db.where('batch_name').equals(parsed.batch_name).and(item => item.id !== id).first();
        if(existingItem) {
            return { status: 409, body: { message: 'Validation errors', errors: ['An item with this batch name already exists.'] }};
        }

        await db.update(id, parsed)
    
        return {status: 200, body: { message: 'Success'}}
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(e => e.message);

            return { status: 400, body: { message: 'Validation errors', errors: errorMessages }};
        }
        return {status: 500, body: { message: 'Internal Server Error'}};
    }
}