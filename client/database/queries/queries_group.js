import gql from 'graphql-tag'

export const QUERY_GROUPS = {
	name: 'groups',
	value: gql`
		query Groups($regionId: ID!) {
			groups(regionId: $regionId) {
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
			}
		}
	`
}
