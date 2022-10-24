import { openDB } from 'idb';

import 'regenerator-runtime/runtime';

export const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('put to the database');

  const contactDb = await openDB('contact_db', 1);

  const tx = contactDb.transaction('contacts', 'readwrite');

  const store = tx.objectStore('contacts');

  const request = store.put({ content: content });

  const result = await request;

  console.log('data saved to database', result)
};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('getting from db');

// create connection to idb

const contactDb = await openDB('contact_db', 1);

// new transaction specify storee and data privs

const tx = contactDb.transaction('contacts', 'readonly');

// open desired object store

const store = tx.objectStore('contacts');

// use getAll() to get all data

const request = store.getAll()

// confirmation and error

const result = await request;
console.log('result.value', result);
return result


}
// console.error('getDb not implemented');

initdb();
