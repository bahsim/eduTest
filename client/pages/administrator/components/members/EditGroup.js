import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import EditGraphQL from '../../../common/hoc/EditGraphQL'
import { MUTATE_EDIT_GROUP } from '../../../../database/mutations'
import { QUERY_GROUP } from '../../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
	button: {
    margin: theme.spacing.unit,
  },
})

const LABEL_NAME 	= 'Наименование'
const LABEL_SAVE 	= 'Сохранить'

const EditGroup = (props) => {  
	
	const { classes, onSave, queryData, groupId, action } = props
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		const name = e.target.name.value.trim()
		
		if (name === '') return
		
		action({ variables: { name, id: groupId } })
			.then(() => onSave(name))
	}
	
	return (
		<Grid container >
			<Grid item xs={6}>
				<form 
					onSubmit={handleSubmit} 
					noValidate 
					autoComplete="off"
				>
					<TextField
						label={LABEL_NAME}
						defaultValue={queryData.name}
						name="name"
						className={classes.textField}
						margin="normal"
						autoFocus
					/>
					<Button 
						type="submit" 
						variant="contained" 
						className={classes.button}
						color="primary"
					>
						{LABEL_SAVE}
					</Button>
				</form>
			</Grid>
		</Grid>
	)
}

const EditGroupGQL =  (
	EditGraphQL(
		withStyles(styles)(
			EditGroup
		)
	)
)

const EditGroupCover = (props) => {
	
	const queryProps = {
		query			: QUERY_GROUP,
		mutation	: MUTATE_EDIT_GROUP,
	}
	
	queryProps.queryParams = {
		id: props.groupId
	}
	return <EditGroupGQL {...props} queryProps={queryProps} />
}

export default withRouter(EditGroupCover)
