import gql from 'graphql-tag'

export const MUTATE_ADD_GROUP = {
	name: 'addGroup',
	value: gql`
		mutation AddGroup($regionId: String!, $name: String!) {
			addGroup(regionId: $regionId, name: $name) {
				id
				name
			}
		}
	`
}
export const MUTATE_EDIT_GROUP = {
	name: 'editGroup',
	value: gql`
		mutation EditGroup($id: ID!, $name: String!) {
			editGroup(id: $id, name: $name) {
				id
				name
			}
		}
	`
}
export const MUTATE_DELETE_GROUP = {
	name: 'deleteGroup',
	value: gql`
		mutation DeleteGroup($id: ID!) {
			deleteGroup(id: $id) {
				id
				name
			}
		}
	`
}
