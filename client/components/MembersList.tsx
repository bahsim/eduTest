import React from 'react'

import { QUERY_MEMBERS } from '../database/queries'

import SimpleList from './SimpleList.tsx'

const GroupsList = (props) => {
	const queryProps = {
		query				: QUERY_MEMBERS,
		queryParams	: {
			regionId	: props.regionId,
			groupId		: props.groupId,
		}
	}
	return <SimpleList {...props} queryProps={queryProps} />
}

export default GroupsList
