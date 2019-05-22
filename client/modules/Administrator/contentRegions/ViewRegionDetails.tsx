import React, { Fragment } from 'react'

import ViewGraphQL  from '../../../database/components/ViewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Typography     from '@material-ui/core/Typography'

const styles = theme => ({
	margin: {
    margin: theme.spacing.unit,
  },
})

const LABEL_ADRESS 	  = 'Адрес'
const LABEL_PASSWORD  = 'Пароль'

interface ComponentProps {
  classes: {
    margin    	: object
  },
  queryProps    : any,
  queryData     : {
    moderator   : string,
    password    : string,
  },
}

const ViewRegionDetails = (props) => (
  <ViewGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </ViewGraphQL>
)

const BaseComponent = (props: ComponentProps) => {

  const { protocol, hostname } 	= window.location
  const { moderator, password } = props.queryData

  return (
    <Fragment>
  		<Typography variant="h6" color="inherit" className={props.classes.margin}>
        {`${LABEL_ADRESS}: ${protocol}//${hostname}/`}<strong>{moderator}</strong>
  		</Typography>
  		<Typography variant="h6" color="inherit" className={props.classes.margin}>
        {LABEL_PASSWORD}: <strong>{props.queryData.password}</strong>
  		</Typography>
    </Fragment>
	)
}

export default withStyles(styles)(ViewRegionDetails)
