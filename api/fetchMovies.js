import axios from 'axios';
import { AsyncStorage } from 'react-native';

const apikey = '8acfc648';
const endpoint = 'http://www.omdbapi.com/?apikey=' + apikey + '&s=*apple*';
const fakeTimeout = 500;

const fetchMovies = async (page, forceRefresh) => {

  var currentEndpoint = endpoint;
  if (page) {
    currentEndpoint += '&page=' + page;
  }

  if (forceRefresh) {
    await AsyncStorage.clear(); 
  }

  try {
    const storedResult = await AsyncStorage.getItem(currentEndpoint);
    
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

  const response = await axios(currentEndpoint);

  try {
    await AsyncStorage.setItem(currentEndpoint, JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
  return response.data.Search;
};

export default fetchMovies;