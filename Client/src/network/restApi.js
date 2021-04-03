import { baseUrl } from '../config/config';

const prepareUrl = (path) => {
  const url = `${baseUrl}/${path}`;
  return url
}


export async function postData(path = '', data = {}) {
  // Default options are marked with *
  const url = prepareUrl(path);
  let response;
  try {
    response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

  } catch (err) {
    console.log('Err', err);
    throw new Error(err);
  }

  return response.json(); // parses JSON response into native JavaScript objects
}