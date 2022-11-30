
import { openDB } from 'idb';

const initdb = async () =>
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
  console.log('POST to database')
  //create connection to database and version
  const jateDB = await openDB('jate', 1);

  //create new transaction and specify database to use and privilages
  const tx = jateDB.transaction('jate', 'readwrite');

  //open the object store
  const store = tx.objectStore('jate');

  //.add() method used to pass in and store the content
  const request = store.put({ id: 1, value: content});

  //confirm the request
  const result = await request;
    console.log('data successfully saved!', result);
};




// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database')

  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);

  const result = await request;
  console.log('result.value', result.value);
  return result.value;

}

initdb();
