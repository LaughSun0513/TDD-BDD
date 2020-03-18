import axios from 'axios';

export const runCallback = (callback) => {
    callback('abc');
}
export const testInstances = (classItems) => {
    new classItems();
}
export const getData = () => {
    return axios.get('/api').then(res=> res.data);
}