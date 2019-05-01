import gql from 'graphql-tag'

export default gql`
	mutation AddRegion($name: String!) {
		addRegion(name: $name) {
			id
			name
		}
	}
`