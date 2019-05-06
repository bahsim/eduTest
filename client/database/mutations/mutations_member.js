import gql from 'graphql-tag'

export const MUTATE_ADD_MEMBER = {
	name: 'addMember',
	value: gql`
		mutation AddMember($regionId: String!, $groupId: String!, $name: String!) {
			addMember(regionId: $regionId, groupId: $groupId, name: $name) {
				id
				name
			}
		}
	`
}
export const MUTATE_EDIT_MEMBER = {
	name: 'editMember',
	value: gql`
		mutation EditMember($id: ID!, $name: String!) {
			editMember(id: $id, name: $name) {
				id
				name
			}
		}
	`
}
export const MUTATE_DELETE_MEMBER = {
	name: 'deleteMember',
	value: gql`
		mutation DeleteMember($id: ID!) {
			deleteMember(id: $id) {
				id
				name
			}
		}
	`
}
