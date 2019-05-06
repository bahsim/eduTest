import gql from 'graphql-tag'

export const QUERY_MEMBERS = {
	name: 'members',
	value: gql`
		query Members($groupId: ID!) {
			members(groupId: $groupId) {
				id
				name
			}
		}
	`
}

export const QUERY_MEMBER = {
	name: 'member',
	value: gql`
		query Member($id: ID!) {
			member(id: $id) {
				id
				name
			}
		}
	`
}
