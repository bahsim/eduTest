import React from 'react'

import { QUERY_TESTS } from '../../database/queries'

import SimpleList from '../common/SimpleList.tsx'

const GroupsList = (props) => {
	const queryProps = {
		query				: QUERY_TESTS,
		queryParams	: {}
	}
	return <SimpleList {...props} queryProps={queryProps} />
}

export default GroupsList
