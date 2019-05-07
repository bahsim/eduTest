import React, { FunctionComponent } from 'react';
import { withRouter } from 'react-router-dom'

import EditGraphQL from '../../../database/components/EditGraphQL'
import { MUTATE_EDIT_GROUP } from '../../../database/mutations'
import { QUERY_GROUP } from '../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

const styles = theme => ({
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

interface ComponentProps {
  classes: {
    textField : object,
    button    : object,
  },
  onSave: (name: string) => any,
  queryData: { name: string },
  groupId   : string,
  action    : (args: { variables: { name: string, id: string }}) => any,
}

const EditGroup: FunctionComponent<ComponentProps> = (props) => {

	const handleSubmit = (e) => {
		e.preventDefault()

		const name = e.target.name.value.trim()

		if (name === '') return

		props.action({ variables: { name: name, id: props.groupId } })
			.then(() => props.onSave(name))
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
						defaultValue={props.queryData.name}
						name="name"
						className={props.classes.textField}
						margin="normal"
						autoFocus
					/>
					<Button
						type="submit"
						variant="contained"
						className={props.classes.button}
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

interface CoverProps {
  groupId: string,
}

const EditGroupCover: FunctionComponent<CoverProps> = (props) => {

	const queryProps = {
		query			: QUERY_GROUP,
		mutation	: MUTATE_EDIT_GROUP,
    queryParams: {
  		id  : props.groupId
  	},
	}

	return <EditGroupGQL {...props} queryProps={queryProps} />
}

export default withRouter(EditGroupCover)
