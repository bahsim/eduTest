import gql from 'graphql-tag'

export const MUTATE_ADD_REGION = {
	name: 'addRegion',
	value: gql`
		mutation AddRegion($name: String!) {
			addRegion(name: $name) {
				id
				name
			}
		}
	`
}

export const MUTATE_EDIT_REGION = {
	name: 'editRegion',
	value: gql`
		mutation EditRegion($id: ID!, $name: String!) {
			editRegion(id: $id, name: $name) {
				id
				name
			}
		}
	`
}

export const MUTATE_DELETE_REGION = {
	name: 'deleteRegion',
	value: gql`
		mutation DeleteRegion($id: ID!) {
			deleteRegion(id: $id) {
				id
				name
			}
		}
	`
}

