import React from 'react'

import DatasetOneLevel	from './routes/DatasetOneLevel'
import DatasetWithGroup	from './routes/DatasetWithGroup'

export default (props) => (
	!props.params.groupParams ?
		<DatasetOneLevel {...props.params} content={props.content} />
	:
		<DatasetWithGroup {...props.params} content={props.content}/>
)
