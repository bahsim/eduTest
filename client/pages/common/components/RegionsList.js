import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';

import ViewGraphQL from '../hoc/ViewGraphQL'
import { QUERY_REGIONS } from '../../../database/queries'

import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import AddIcon from '@material-ui/icons/Add'
import PageviewIcon from '@material-ui/icons/Pageview'

const styles = theme => ({
	tableRow: {
		cursor: 'pointer',
	},
})

const RegionsList = (props) => {

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

const RegionsListGQL =  (
	ViewGraphQL(
		withStyles(styles)(
			RegionsList
		)
	)
)

const RegionsListCover = (props) => {

	const queryProps = {
		query				: QUERY_REGIONS,
		queryParams	: {}
	}

	return <RegionsListGQL {...props} queryProps={queryProps} />
}

export default RegionsListCover
