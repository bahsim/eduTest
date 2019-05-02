import gql from 'graphql-tag'

export default gql`
  query RegionGroups($id: ID!) {
    regionGroups(id: $id) {
      id
      name
			groups {
				id
				name
			}
    }
  }
`
