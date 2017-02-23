import { fromJS } from 'immutable';

const initialState = fromJS({
	posts: {
		page: 1,
		entities: {},
	},
});

export default initialState;