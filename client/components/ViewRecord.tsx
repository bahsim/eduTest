import React, { Component, Fragment, useState, useEffect } from 'react'

import EditGraphQL  from '../database/components/EditGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Typography     from '@material-ui/core/Typography'
import TextField      from '@material-ui/core/TextField'
import Button         from '@material-ui/core/Button';
import IconButton     from '@material-ui/core/IconButton'
import EditIcon       from '@material-ui/icons/Edit'

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
})

const LABEL_NEW_NAME 	= 'Новое наименование'
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
  },
  queryProps: {
    queryParams: {
      id      : string
    }
  },
  queryData   : any
  action      : (args: { variables: { id: string, name: string }}) => any
}

const ViewRecord = (props) => (
  <EditGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </EditGraphQL>
)

const BaseComponent = (props: ComponentProps) => {

  const [ editState, setEditState ] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()

		const name = e.target.name.value.trim()
		const { id } = props.queryProps.queryParams

		if (name === '') return

		props.action({ variables: { id, name }})
			.then(() => {
				setEditState(false)
        props.onClick({...props.queryData, name})
			})
	}

  useEffect(() => {
    props.extraAction(props.queryData)
  }, [])

  return (
    <Fragment>
  		<Typography variant="h6" color="inherit" className={props.classes.margin}>
  			{props.queryData.name}
  			{!editState &&
  				<IconButton aria-label="Delete" onClick={() => setEditState(true)}>
  					<EditIcon fontSize="small" />
  				</IconButton>
  			}
  		</Typography>
  		{editState &&
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
  				<Button
  					variant="contained"
  					className={props.classes.button}
  					onClick={() => setEditState(false)}
  				>
  					{LABEL_CLOSE}
  				</Button>
  			</form>
  		}
    </Fragment>
	)
}

export default withStyles(styles)(ViewRecord)
