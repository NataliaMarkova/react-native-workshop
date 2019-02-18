import axios from 'axios';
import { AsyncStorage } from 'react-native';

const apikey = '8acfc648';
const endpoint = 'http://www.omdbapi.com/?apikey=' + apikey + '&s=*apple*&page=1';
const fakeTimeout = 500;

const fetchMovies = async () => {
  try {
    const storedResult = await AsyncStorage.getItem(endpoint);
    
    if (storedResult !== null) {
      return new Promise( (resolve) => {
        setTimeout(() => {
          resolve(JSON.parse(storedResult).Search);
        }, fakeTimeout);
      });
    }
  } catch (error) {
    console.error('failed to retrieve stored data', error);
  }

  const response = await axios(endpoint);

  try {
    await AsyncStorage.setItem(endpoint, JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
  return response.data.Search;
};

export default fetchMovies;