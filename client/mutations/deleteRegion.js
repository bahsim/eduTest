import gql from 'graphql-tag'

export default gql`
	mutation DeleteRegion($id: ID!) {
		deleteRegion(id: $id) {
			id
			name
		}
	}
`