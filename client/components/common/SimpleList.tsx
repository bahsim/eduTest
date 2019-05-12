import React, { useState } from 'react'

import ViewGraphQL from '../../database/components/ViewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Table 					from '@material-ui/core/Table'
import TableBody 			from '@material-ui/core/TableBody'
import TableCell 			from '@material-ui/core/TableCell'
import TableHead 			from '@material-ui/core/TableHead'
import TableRow 			from '@material-ui/core/TableRow'
import AddIcon 				from '@material-ui/icons/Add'
import PageviewIcon 	from '@material-ui/icons/Pageview'

const styles = theme => ({
	tableRow: {
		cursor: 'pointer',
	},
})

interface ComponentProps {
	classes: {
		tableRow		: object
	},
	queryData			: { map: (list: any) => any },
	label					: string,
	onClick				: (id: string, name: string) => any,
	onDoubleClick	: (id: string, name: string) => any,
}

const SimpleList = (props) => (
	<ViewGraphQL queryProps={props.queryProps}>
		<Component {...props} />
	</ViewGraphQL>
)

const Component = (props: ComponentProps) => {

	const [ currentItem, setCurrentItem ] = useState('')

	const {
		classes,
		queryData,
		label,
		onClick,
		onDoubleClick,
	} = props;

	const handleOnClick = (id, name) => {
		setCurrentItem(id)
		onClick && onClick(id, name)
	}

	const handleOnDoubleClick = (id, name) => {
		setCurrentItem(id)
		onDoubleClick && onDoubleClick(id, name)
	}

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>{label}</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{queryData.map(item => (
					<TableRow hover
						key={item.id}
						className={classes.tableRow}
						selected={currentItem === item.id}
						onClick={() => handleOnClick(item.id, item.name)}
						onDoubleClick={() => handleOnDoubleClick(item.id, item.name)}
					>
						<TableCell component="th" scope="row" >
							{item.name}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default withStyles(styles)(SimpleList)
