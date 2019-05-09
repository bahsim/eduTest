import React from 'react'

import { QUERY_GROUPS } from '../database/queries'

import SimpleList from './SimpleList.tsx'

const GroupsList = (props) => {
	const queryProps = {
		query				: QUERY_GROUPS,
		queryParams	: {
			regionId	: props.regionId
		}
	}
	return <SimpleList {...props} queryProps={queryProps} />
}

export default GroupsList
