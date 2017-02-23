import apiClient from './apiClient';

function setPost(post) {
	return {
		type: 'SET_POST',
		payload: post,
	};
}

function postsNextPage() {
	return async (dispatch, getState) => {
		const state = getState();

		const currentPage = state.get('posts').get('page');

		const posts = await apiClient.getList(currentPage);

		dispatch(
			setPost(posts),
		);

		return posts;
	};
}

export default {
	setPost,
	postsNextPage,
};
