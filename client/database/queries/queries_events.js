import gql from 'graphql-tag'

const FRAGMENT_COMMON = gql`
	fragment Common on EventType {
		id
		name
		dateStart
		dateEnd
		time
		region {
			id
			name
		}
		group {
			id
			name
		}
	}
`

export const QUERY_EVENTS_CURRENT = {
	name: 'eventsCurrent',
	value: gql`
	query EventsCurrent(
		$regionId: String,
		$groupId: String,
	) {
			eventsCurrent(
				regionId: $regionId,
				groupId: $groupId,
			) {
				...Common
			}
		}
		${FRAGMENT_COMMON}
	`
}

export const QUERY_EVENTS_HISTORY = {
	name: 'eventsHistory',
	value: gql`
	query EventsHistory(
		$regionId: String,
		$groupId: String,
		$dateStart: String,
		$dateEnd: String,
	) {
			eventsHistory(
				regionId: $regionId,
				groupId: $groupId,
				dateStart: $dateStart,
				dateEnd: $dateEnd,
			) {
				...Common
			}
		}
		${FRAGMENT_COMMON}
	`
}

export const QUERY_EVENT = {
	name: 'event',
	value: gql`
		query Event($id: ID!) {
			event(id: $id) {
				...Common
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
		${FRAGMENT_COMMON}
	`
}
