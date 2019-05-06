import React from 'react';
import { withRouter } from 'react-router-dom'

import DeleteGraphQL from '../../../common/hoc/DeleteGraphQL'
import { MUTATE_DELETE_GROUP } from '../../../../database/mutations'
import { QUERY_GROUPS, QUERY_GROUP } from '../../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const styles = theme => ({
	button: {
    margin: theme.spacing.unit,
  },
	title: {
    margin: theme.spacing.unit,
		marginBottom: theme.spacing.unit*3,
	},
})

const LABEL_DELETE 	= 'Удалить'

const DeleteGroup = (props) => {  
	
	const { classes, onDelete, groupId, queryData, action } = props

	const handleSubmit = (e) => {
		e.preventDefault()
		
		action({ variables: { id: groupId } })
			.then(() => onDelete())
	}
	
	return (
		<div>	
			<Typography  variant="h6" color="inherit" className={classes.title}>
				{queryData.name}
			</Typography>
			<Button 
				type="submit" 
				variant="contained" 
				color="secondary" 
				className={classes.button}
				onClick={handleSubmit}
			>
				{LABEL_DELETE}
			</Button>
		</div>
	)
}

const DeleteGroupGQL =  (
	DeleteGraphQL(
		withStyles(styles)(
			DeleteGroup
		)
	)
)

const DeleteGroupCover = (props) => {
	
	const queryProps = {
		query			: QUERY_GROUP,
		mutation	: MUTATE_DELETE_GROUP,
		update		: QUERY_GROUPS,
	}
	
	queryProps.queryParams = { 
		id: props.groupId
	}
	queryProps.updateParams = {
		regionId: props.regionId
	}
	
	return <DeleteGroupGQL {...props} queryProps={queryProps} />
}

export default withRouter(DeleteGroupCover)
