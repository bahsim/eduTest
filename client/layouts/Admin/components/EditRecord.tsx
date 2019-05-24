import React, { useEffect } from 'react'

import EditGraphQL  from '../../../database/components/EditGraphQL'

import { withStyles } from '@material-ui/core/styles'
import TextField      from '@material-ui/core/TextField'
import Button         from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
	button: {
    margin      : theme.spacing.unit,
  },
	margin: {
    margin      : theme.spacing.unit,
  },
  content: {
    margin      : theme.spacing.unit
  }
})

const LABEL_NEW_NAME 	= 'Новое значение'
const LABEL_SAVE 			= 'Сохранить'
const LABEL_CLOSE 		= 'Закрыть'

interface ComponentProps {
  children    : any,
  onClick     : (data: any) => any,
  extraAction : (data: any) => any,
  classes: {
    textField : object
    button    : object
    margin    : object
    content   : string
  },
  queryProps    : {
    queryParams : {
      id  : string
    }
  },
  queryData     : any
  action        : (args: { variables: { id: string, name: string }}) => any
}

const EditRecord = (props) => (
  <EditGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </EditGraphQL>
)

const BaseComponent = (props: ComponentProps) => {

	const handleSubmit = e => {
		e.preventDefault()

		const name = e.target.name.value.trim()
		const { id } = props.queryProps.queryParams

		if (name === '') return

		props.action({ variables: { id, name }})
			.then(() => {
        props.onClick({...props.queryData, name})
			})
	}

  useEffect(() => {
    props.extraAction(props.queryData)
  }, [])

  return (
		<form onSubmit={handleSubmit} noValidate autoComplete="off">
			<TextField
				label={LABEL_NEW_NAME}
				name="name"
				defaultValue={props.queryData.name}
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

export default withStyles(styles)(EditRecord)
