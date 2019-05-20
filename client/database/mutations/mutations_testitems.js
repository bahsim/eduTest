import gql from 'graphql-tag'

export const MUTATE_ADD_TESTITEM = {
	name: 'addTestItem',
	value: gql`
		mutation AddTestItem($testId: String!, $value: String!, $variants: [TestItemVariantType]) {
			addTestItem(testId: $testId, value: $value, variants: $variants) {
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
export const MUTATE_EDIT_TESTITEM = {
	name: 'editTestItem',
	value: gql`
		mutation EditTestItem($id: ID!, $value: String!, $variants: [TestItemVariantType]) {
			editTestItem(id: $id, value: $value, variants: $variants) {
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
export const MUTATE_DELETE_TESTITEM = {
	name: 'deleteTestItem',
	value: gql`
		mutation DeleteTestItem($id: ID!) {
			deleteTestItem(id: $id) {
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
