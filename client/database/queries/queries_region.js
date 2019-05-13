import gql from 'graphql-tag'

export const QUERY_REGIONS = {
	name: 'regions',
	value: gql`
		{
			regions {
				id
				name
			}
		}
	`
}

export const QUERY_REGION = {
	name: 'region',
	value: gql`
		query Region($id: ID!) {
			region(id: $id) {
				id
				name
			}
		}
	`
}

export const QUERY_REGION_GROUPS = {
	name: 'regionGroups',
	value: gql`
		query RegionGroups($id: ID!) {
			regionGroups(id: $id) {
				id
				name
				list {
					id
					name
				}
			}
		}
	`
}
