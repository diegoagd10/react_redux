import fetch from 'isomorphic-fetch';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

const apiClient = {

	getList: async (page = 1) => {
		const response = await fetch(`${baseUrl}?_page=${page}`);
		const data = await response.json();

		return data;
	},
	
};

export default apiClient;
