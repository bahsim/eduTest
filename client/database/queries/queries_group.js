import gql from 'graphql-tag'

export const QUERY_GROUPS = {
	name: 'groups',
	value: gql`
		query Groups($parentId: ID!) {
			groups(regionId: $parentId) {
				id
				name
			}
		}
	`
}

export const QUERY_GROUP = {
	name: 'group',
	value: gql`
		query Group($id: ID!) {
			group(id: $id) {
				id
				name
				parent {
					id
					name
				}
			}
		}
	`
}
