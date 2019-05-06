import React from 'react';
import { withRouter } from 'react-router-dom'

import NewGraphQL from '../../../common/hoc/NewGraphQL'
import { MUTATE_ADD_GROUP } from '../../../../database/mutations'
import { QUERY_GROUPS } from '../../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

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

const NewGroup = (props) => {  
	
	const { classes, onSave, regionId, action } = props
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		const name = e.target.name.value.trim()
		
		if (name === '') return
		
		action({ variables: { name, regionId } })
			.then(() => onSave())
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

const NewGroupGQL =  (
	NewGraphQL(
		withStyles(styles)(
			NewGroup
		)
	)
)

const NewGroupCover = (props) => {
	
	const queryProps = {
		mutation	: MUTATE_ADD_GROUP,
		update		: QUERY_GROUPS,
	}
	
	queryProps.updateParams = {
		regionId: props.regionId
	}
	
	return <NewGroupGQL {...props} queryProps={queryProps} />
}

export default withRouter(NewGroupCover)
