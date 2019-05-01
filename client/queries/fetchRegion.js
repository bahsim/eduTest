import gql from 'graphql-tag'

export default gql`
  query Region($id: ID!) {
    region(id: $id) {
      id
      name
    }
  }
`
