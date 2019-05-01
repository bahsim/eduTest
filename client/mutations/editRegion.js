import gql from 'graphql-tag'

export default gql`
	mutation EditRegion($id: ID!, $name: String!) {
		editRegion(id: $id, name: $name) {
			id
			name
		}
	}
`