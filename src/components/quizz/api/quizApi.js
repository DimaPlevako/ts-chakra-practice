import axios from "axios";
const key = 'IVOSELZirpdAXcxf2TInkLWxZNiIEJ83dA52aHmz';


/*
* make Axios request to the quiz API url - https://quizapi.io/api/v1/questions
* @returns {Promise} - Promise that resolves to the quiz data
* @throws {Error} - Throws an error if the request fails
* * @example

* */
const quizApi = axios.create({
    baseURL: 'https://quizapi.io/api/v1/questions',
    headers: {
        'X-Api-Key': key
    }
});

const getQuizData = async (params) => {
    try {
        const response = await quizApi.get('', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        throw new Error('Failed to fetch quiz data');
    }
}

export default getQuizData;

