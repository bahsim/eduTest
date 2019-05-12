import React from 'react';

import { withStyles } from '@material-ui/core/styles'
import Breadcrumbs 		from '@material-ui/lab/Breadcrumbs'
import Typography 		from '@material-ui/core/Typography'

const styles = theme => ({
	breadcrumb: {
		marginTop: 			theme.spacing.unit,
		marginBottom: 	theme.spacing.unit,
		textTransform: 	'uppercase'
	},
})

interface ComponentProps {
  list: {
    map : ( method: (item: string, index: number) => any ) => any,
  },
  classes: any,
}

const Component = ({ list, classes }: ComponentProps) => {
	const content = (
    list.map((item, index) => (
  		<Typography
        key={index}
        color="textPrimary"
        className={classes.breadcrumb}
      >
  			{item}
  		</Typography>
  	))
  )
  return (
    <Breadcrumbs separator=">>" arial-label="Breadcrumb">
      {content}
    </Breadcrumbs>
  )
}

export default withStyles(styles)(Component)
