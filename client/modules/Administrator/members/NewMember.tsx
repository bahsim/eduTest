import React, { FunctionComponent } from 'react'
import { withRouter } from 'react-router-dom'

import NewGraphQL from '../../../database/components/NewGraphQL'
import { MUTATE_ADD_MEMBER } from '../../../database/mutations'
import { QUERY_MEMBERS } from '../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
	button: {
    margin  : theme.spacing.unit,
  },
})

const LABEL_NAME 	= 'Фамилия Имя Отчество'
const LABEL_SAVE 	= 'Сохранить'

interface ComponentProps {
  classes : {
    container : object,
    textField : object,
    button    : object,
  },
  onSave: () => any,
  regionId: string,
  groupId : string,
  action  : (
    args: { variables: {
      name      : string,
      regionId  : string,
      groupId   : string }}) => any,
}

const NewMember: FunctionComponent<ComponentProps> = (props) => {

	const handleSubmit = (e) => {
		e.preventDefault()

		const name = e.target.name.value.trim()

		if (name === '') return

		props.action({ variables: {
      name      : name,
      regionId  : props.regionId,
      groupId   : props.groupId,
    }})
    .then(() => props.onSave())
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

const NewMemberGQL =  (
	NewGraphQL(
		withStyles(styles)(
			NewMember
		)
	)
)

interface CoverProps {
  groupId: string,
}

const NewMemberCover: FunctionComponent<CoverProps> = (props) => {

	const queryProps = {
		mutation    : MUTATE_ADD_MEMBER,
		update		  : QUERY_MEMBERS,
    updateParams: {
  		groupId : props.groupId
  	}
	}

	return <NewMemberGQL {...props} queryProps={queryProps} />
}

export default withRouter(NewMemberCover)
