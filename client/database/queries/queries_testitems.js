import gql from 'graphql-tag'

export const QUERY_TESTITEMS = {
	name: 'testItems',
	value: gql`
		query TestItems($testId: ID!) {
			testItems(testId: $testId) {
				id
				value
				variants {
					value
					mark
				}
			}
		}
	`
}

export const QUERY_TESTITEM = {
	name: 'testItem',
	value: gql`
		query TestItem($id: ID!) {
			testItem(id: $id) {
				id
				value
				variants {
					value
					mark
				}
			}
		}
	`
}
