import React from 'react'

import NewGraphQL from '../../database/components/NewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import TextField      from '@material-ui/core/TextField'
import Button         from '@material-ui/core/Button'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
	button: {
    margin      : theme.spacing.unit,
  },
})

const LABEL_NAME 	= 'Наименование'
const LABEL_SAVE 	= 'Сохранить'

interface BaseComponentProps {
  classes: {
    textField : object
    button    : object
  },
  action  : (args: { variables: { name } }) => any,
  onClick: () => any,
}

const NewRecord = (props) => (
  <NewGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </NewGraphQL>
)

const BaseComponent = (props: BaseComponentProps) => {

  const handleSubmit = (e) => {
		e.preventDefault()

		const name = e.target.name.value.trim()
		if (name === '') return

		props.action({ variables: { name }})
			.then(() => props.onClick())
	}

	return (
  	<form onSubmit={handleSubmit} noValidate autoComplete="off">
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
	)
}

export default withStyles(styles)(NewRecord)
