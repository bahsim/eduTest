import React, { Fragment, useEffect, useState } from 'react'
import uuidv4 from 'uuid/v4'

import EditGraphQL  from '../../../database/components/EditGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Typography     from '@material-ui/core/Typography'
import TextField      from '@material-ui/core/TextField'
import Button         from '@material-ui/core/Button';
import RefreshIcon    from '@material-ui/icons/Refresh'

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
  icon: {
		marginRight : theme.spacing.unit,
	},
	margin: {
    margin      : theme.spacing.unit,
  },
})

const LABEL_ADRESS 	  = 'Адрес'
const LABEL_KEY       = 'Ключ'
const LABEL_PASSWORD  = 'Пароль'
const LABEL_SAVE 			= 'Сохранить'

interface ComponentProps {
  children    : any,
  onClick     : (data: any) => any,
  extraAction : (data: any) => any,
  classes: {
    textField : object
    icon      : object
    margin    : object
  },
  queryProps: {
    queryParams: {
      id      : string
    }
  },
  queryData   : any
  action: (
    args: { variables: { id: string, moderator: string, password: string }}
  ) => any,
}

const EditRegionDetails = (props) => (
  <EditGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </EditGraphQL>
)

const BaseComponent = (props: ComponentProps) => {

  const [ key, setKey ]           = useState('')
  const [ password, setPassword ] = useState('')
  const { protocol, hostname }    = window.location

	const handleSubmit = e => {
		e.preventDefault()

		const { id } = props.queryProps.queryParams
		if (key === '' || password === '') return

		props.action({ variables: { id, moderator: key, password: password }})
			.then(() => {
        props.onClick({...props.queryData, moderator: key, password: password })
			})
	}

  useEffect(() => {
    setKey(props.queryData.moderator)
    setPassword(props.queryData.password)
  }, [])

  return (
    <Fragment>
  		<Typography variant="h6" color="inherit" className={props.classes.margin}>
        {`${LABEL_ADRESS}: ${protocol}//${hostname}/`}<strong>{key}</strong>
  		</Typography>
  		<form onSubmit={handleSubmit} noValidate autoComplete="off">
  			<TextField
  				label={LABEL_KEY}
  				name="key"
  				value={key}
  				className={props.classes.textField}
  				margin="normal"
          InputProps={{
            startAdornment: (
              <Button
                className={props.classes.margin}
                onClick={(e) => setKey(uuidv4())}
              >
                <RefreshIcon className={props.classes.icon} />
              </Button>
            ),
          }}
  			/>
  			<TextField
  				label={LABEL_PASSWORD}
  				name="password"
          value={password}
  				onChange={(e) => setPassword(e.target.value)}
  				className={props.classes.textField}
  				margin="normal"
          InputProps={{
            startAdornment: (
              <Button
                className={props.classes.margin}
                onClick={(e) => setPassword(uuidv4().substr(0,8))}
              >
                <RefreshIcon className={props.classes.icon} />
              </Button>
            ),
          }}
  			/>
  			<Button
  				type="submit"
  				variant="contained"
  				className={props.classes.margin}
  				color="primary"
  			>
  				{LABEL_SAVE}
  			</Button>
  		</form>
    </Fragment>
	)
}

export default withStyles(styles)(EditRegionDetails)
