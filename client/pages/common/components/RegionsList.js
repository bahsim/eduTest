import React, { Component } from 'react';
import { Query } from 'react-apollo';

import ViewGraphQL from '../hoc/ViewGraphQL'
import FETCH_REGIONS from '../../../queries/fetchRegions';

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

// const ViewGraphQLProps = {
	// query			: FETCH_REGIONS,
	// dataName	: 'regions',
// }

// export default ViewGraphQL(ViewGraphQLProps)(
	// withStyles(styles)(RegionsList)
// )

const RegionsListGQL =  (
	ViewGraphQL(
		withStyles(styles)(
			RegionsList
		)
	)
)

const RegionsListCover = (props) => {
	
	const queryProps = {
		query			: FETCH_REGIONS,
		dataName	: 'regions',
	}
	
	queryProps.queryParams = {}
	
	return <RegionsListGQL {...props} queryProps={queryProps} />
}

export default RegionsListCover
