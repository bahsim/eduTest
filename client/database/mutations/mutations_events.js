import gql from 'graphql-tag'

export const MUTATE_ADD_EVENT = {
	name: 'addEvent',
	value: gql`
		mutation AddEvent(
			$testId		: String!,
			$regionId	: String!,
			$groupId	: String!,
			$session	: EventSessionInputType,
			$dateStart: String!,
			$dateEnd	: String!,
		) {
			addEvent(
				testId		: $testId,
				regionId	: $regionId,
				groupId		: $groupId,
				session		: $session,
				dateStart	: $dateStart,
				dateEnd		: $dateEnd,
			) {
				id
				name
				dateStart
				dateEnd
				session {
					count
					time
				}
				region {
					id
					name
				}
				group {
					id
					name
				}
				items {
		      id
		      value
		      variants {
		        id
		        value
		        mark
		      }
		    }
			}
		}
	`
}
export const MUTATE_DELETE_EVENT = {
	name: 'deleteEvent',
	value: gql`
		mutation DeleteEvent($id: ID!) {
			deleteEvent(id: $id) {
				id
				value
			}
		}
	`
}
