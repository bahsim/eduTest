
import * as types from '../constants/ActionTypes'

export function appHasErrored(state = '', action) {
	switch (action.type) {
		case types.APP_HAS_ERRORED:
			return action.hasErrored;
		default:
			return state;
	}
}

export function appIsLoading(state = true, action) {
	switch (action.type) {
		case types.APP_IS_LOADING:
			return action.isLoading;
		default:
			return state;
	}
}

export function registry(state = [], action) {
	switch (action.type) {
		case types.REGISTRY_PUT:
			return action.value;
		default:
			return state;
	}
}

export function authors(state = [], action) {
	switch (action.type) {
		case types.AUTHORS_PUT:
			return action.value;
		default:
			return state;
	}
}

export function users(state = [], action) {
	switch (action.type) {
		case types.USERS_PUT:
			return action.value;
		default:
			return state;
	}
}

export function books(state = [], action) {
	switch (action.type) {
		case types.BOOKS_PUT:
			return action.value;
		default:
			return state;
	}
}
