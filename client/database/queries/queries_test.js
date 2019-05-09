import gql from 'graphql-tag'

export const QUERY_TESTS = {
	name: 'tests',
	value: gql`
		{
			tests {
				id
				name
			}
		}
	`
}

export const QUERY_TEST = {
	name: 'test',
	value: gql`
		query Test($id: ID!) {
			test(id: $id) {
				id
				name
			}
		}
	`
}
