import React from 'react'

import DatasetOneLevel	from './routes/DatasetOneLevel'
import DatasetWithGroup	from './routes/DatasetWithGroup'

export default (props) => {

	const { groupParams } = props.params

	switch (true) {
		case !groupParams		: return <DatasetOneLevel {...props.params} />
		case !!groupParams	: return <DatasetWithGroup {...props.params} />
		default							: return null
	}
}
