import axios from 'axios';

export const fetchData = (fn) => {
	axios.get('http://www.dell-lee.com/react/api/demo.json').then((res) => {
		fn(res.data)
	});
	// 错误case
	// axios.get('http://www.dell-lee.com/react/api/demo1.json').then((res) => {
	// 	fn(res.data)
	// });
}
export const fetchPromise = () => {
	return axios.get('http://www.dell-lee.com/react/api/demo.json');
	// 错误case
	// return axios.get('http://www.dell-lee.com/react/api/demo1.json');
}
export const fetchError = () => {
	// 错误case
	return axios.get('http://www.dell-lee.com/react/api/demo1.json');
}