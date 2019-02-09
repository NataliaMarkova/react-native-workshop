import axios from 'axios';
import { AsyncStorage } from 'react-native';

const apiKey = '8acfc648';
const endpoint = 'http://www.omdbapi.com/?apikey=${apiKey}&s=*apple*';

export default fetchMovies = async () => {
    const respons = await(axios(endpoint));
    return respons;
}