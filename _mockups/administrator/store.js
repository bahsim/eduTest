function reducer(state, action) {
	switch (action.type) {
		case 'TASKS':
			return {
				...state, 
				tasks						: action.tasks,
				tasksTotalCount	: action.tasksTotalCount,
				pagesCount			: action.pagesCount,
			}
		case 'SORT':
			return {
				...state,
				page					: 1,
				tasks					: [],
				sortDirection	: action.sortDirection,
				sortColumn		: action.sortColumn,
			}
		case 'LEAF':
			return {
				...state, 
				page : action.page,
			}
		case 'LOGIN':
			return {
				...state, 
				loggedIn	: true,
				username	: action.username,
			}
		default:
			return state;
	}
}
const initialState = {
	tasks						: [],
	page						: 1,
	sortDirection		: 'asc',
	sortColumn			: 'username',
	tasksTotalCount	: 0,
	pagesCount			: 0,
	loggedIn				: false,
	username				: '',
}
const store = Redux.createStore(reducer, initialState);
