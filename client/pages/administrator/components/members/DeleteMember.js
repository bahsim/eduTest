import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from "react-apollo";

import DeleteGraphQL from '../../../common/hoc/DeleteGraphQL'
import { MUTATE_DELETE_MEMBER } from '../../../../database/mutations'
import { QUERY_MEMBERS, QUERY_MEMBER } from '../../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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

const DeleteMember = (props) => {  
	
	const { classes, onDelete, memberId, queryData, action } = props

	const handleSubmit = (e) => {
		e.preventDefault()
		
		action({ variables: { id: memberId } })
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

const DeleteMemberGQL =  (
	DeleteGraphQL(
		withStyles(styles)(
			DeleteMember
		)
	)
)

const DeleteMemberCover = (props) => {
	
	const queryProps = {
		query			: QUERY_MEMBER,
		mutation	: MUTATE_DELETE_MEMBER,
		update		: QUERY_MEMBERS,
	}
	
	queryProps.queryParams = { 
		id: props.memberId
	}
	queryProps.updateParams = {
		groupId: props.groupId
	}
	
	return <DeleteMemberGQL {...props} queryProps={queryProps} />
}

export default withRouter(DeleteMemberCover)
