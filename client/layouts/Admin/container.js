import React from 'react'

import PrimaryDataSimple		from './routes/PrimaryDataSimple'
import PrimaryDataWithGroup	from './routes/PrimaryDataWithGroup'
import SecondaryData				from './routes/SecondaryData'

export default (props) => {
	switch (props.type) {
		case 'PrimaryDataSimple':
			return (
				<PrimaryDataSimple
					{...props.params}
					content={props.content}
				/>
			)
		case 'PrimaryDataWithGroup':
			return (
				<PrimaryDataWithGroup
					{...props.params}
					content={props.content}
				/>
			)
		case 'SecondaryData':
			return (
				<SecondaryData
					{...props.params}
					components={props.components}
					content={props.content}
				/>
			)
	}
}
