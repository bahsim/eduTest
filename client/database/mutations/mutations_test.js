import gql from 'graphql-tag'

export const MUTATE_ADD_TEST = {
	name: 'addTest',
	value: gql`
		mutation AddTest($name: String!) {
			addTest(name: $name) {
				id
				name
			}
		}
	`
}

export const MUTATE_EDIT_TEST = {
	name: 'editTest',
	value: gql`
		mutation EditTest($id: ID!, $name: String!) {
			editTest(id: $id, name: $name) {
				id
				name
			}
		}
	`
}

export const MUTATE_DELETE_TEST = {
	name: 'deleteTest',
	value: gql`
		mutation DeleteTest($id: ID!) {
			deleteTest(id: $id) {
				id
				name
			}
		}
	`
}
