import Dexie from 'dexie';

// This file is used to generate an IndexedDB database outlining the table we are creating
const database = new Dexie("UserFormDatabase");

// sets the field values for the IndexedDB database
database.version(1).stores({
  userForms: '++id, batch_name, test_date, &temperature, &spoilage, sensor_ids'
});
// makes the database accessible throughout the application
export const db = database.table('userForms');

// set out the interface for any object stored in the database
export interface IUserForm {
  id?: number;  // optional because it's auto-incremented
  batch_name: string;
  test_date: string;
  temperature: number[];  // updated to number (float)
  spoilage: number[];     // updated to number (integer)
  sensor_ids: string[];
}