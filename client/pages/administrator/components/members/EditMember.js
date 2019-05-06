import React from 'react';
import { withRouter } from 'react-router-dom'

import EditGraphQL from '../../../common/hoc/EditGraphQL'
import { MUTATE_EDIT_MEMBER } from '../../../../database/mutations'
import { QUERY_MEMBER } from '../../../../database/queries'

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

const LABEL_NAME 	= 'Фамилия Имя Отчество'
const LABEL_SAVE 	= 'Сохранить'

const EditMember = (props) => {  
	
	const { classes, onSave, queryData, memberId, action } = props
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		const name = e.target.name.value.trim()
		
		if (name === '') return
		
		action({ variables: { name, id: memberId } })
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

const EditMemberGQL =  (
	EditGraphQL(
		withStyles(styles)(
			EditMember
		)
	)
)

const EditMemberCover = (props) => {
	
	const queryProps = {
		query			: QUERY_MEMBER,
		mutation	: MUTATE_EDIT_MEMBER,
	}
	
	queryProps.queryParams = {
		id: props.memberId
	}
	return <EditMemberGQL {...props} queryProps={queryProps} />
}

export default withRouter(EditMemberCover)
