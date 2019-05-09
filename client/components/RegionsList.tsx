import React from 'react'

import { QUERY_REGIONS } from '../database/queries'

import SimpleList from './SimpleList.tsx'

const GroupsList = (props) => {
	const queryProps = {
		query				: QUERY_REGIONS,
		queryParams	: {}
	}
	return <SimpleList {...props} queryProps={queryProps} />
}

export default GroupsList
