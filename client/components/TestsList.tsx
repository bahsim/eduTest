import React from 'react'
import { Query } from 'react-apollo'

import ViewGraphQL from '../database/components/ViewGraphQL'
import { QUERY_TESTS } from '../database/queries'

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
	selectedItem	: (id: string) => any,
	onClick				: (id: string, name: string) => any,
	onDoubleClick	: (id: string, name: string) => any,
}

const TestsList = (props: ComponentProps) => {
	const queryProps = {
		query				: QUERY_TESTS,
		queryParams	: {}
	}
	return (
		<ViewGraphQL queryProps={queryProps}>
			<Component {...props} />
		</ViewGraphQL>
	)
}

const Component = (props) => {

	const {
		classes,
		queryData,
		label,
		selectedItem,
		onClick,
		onDoubleClick,
	} = props;

	const handleOnClick = (
		onClick ? onClick : () => {}
	)
	const handleOnDoubleClick = (
		onDoubleClick? onDoubleClick : () => {}
	)
	const currentItem = (
		selectedItem ? selectedItem : ''
	)

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

export default withStyles(styles)(TestsList)
