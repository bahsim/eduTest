import React from 'react'

import PrimaryDataSimple	from './routes/PrimaryDataSimple'
import PrimaryDataWithGroup	from './routes/PrimaryDataWithGroup'

export default (props) => (
	!props.params.groupParams ?
		<PrimaryDataSimple {...props.params} content={props.content} />
	:
		<PrimaryDataWithGroup {...props.params} content={props.content}/>
)
