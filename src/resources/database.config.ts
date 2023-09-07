import Dexie from 'dexie';

// This file is used to generate an IndexedDB database outlining the table we are creating
const database = new Dexie("UserFormDatabase");

database.version(1).stores({
  userForms: '++id, batch_name, test_date, &temperature, &spoilage, sensor_ids'
});

export const db = database.table('userForms');

export interface IUserForm {
  id?: number;  // optional because it's auto-incremented
  batch_name: string;
  test_date: string;
  temperature: number[];  // updated to number (float)
  spoilage: number[];     // updated to number (integer)
  sensor_ids: string[];
}