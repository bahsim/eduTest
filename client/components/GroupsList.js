import React, { Component } from 'react';
import { Query } from 'react-apollo';

import ViewGraphQL from '../database/components/ViewGraphQL'
import { QUERY_GROUPS } from '../database/queries'

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

const GroupsList = (props) => {

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
						selected={selectedItem === item.id}
						onClick={() => onClick(item.id, item.name)}
						onDoubleClick={() => onDoubleClick(item.id, item.name)}
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

const GroupsListGQL =  (
	ViewGraphQL(
		withStyles(styles)(
			GroupsList
		)
	)
)

const GroupsListCover = (props) => {

	const queryProps = {
		query			: QUERY_GROUPS,
	}

	queryProps.queryParams = {
		regionId: props.regionId
	}

	return <GroupsListGQL {...props} queryProps={queryProps} />
}

export default GroupsListCover