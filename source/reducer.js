import { Map as map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import initialState from './initialState';

function postsPageReducer(state = initialState.get('posts').get('page'), action = {}) {
	switch (action.type) {
		case 'SET_POST':
			return state + 1;

		default:
			return state;
	}
}

function postsEntitiesReducer(state = initialState.get('posts').get('entities'), action = {}) {
	switch (action.type) {
		case 'SET_POST':
			return action.payload
				.reduce(
					(posts, post) => posts.set(post.id, map(post)),
					state,
				);

		default:
			return state;
	}
}

const postsReducer = combineReducers({
	page: postsPageReducer,
	entities: postsEntitiesReducer,
});

const reducer = combineReducers({
	posts: postsReducer,
});

export default reducer;
