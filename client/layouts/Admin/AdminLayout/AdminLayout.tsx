import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import AppBar         from '@material-ui/core/AppBar'
import Toolbar        from '@material-ui/core/Toolbar'
import Typography     from '@material-ui/core/Typography'
import Grid           from '@material-ui/core/Grid'
import Paper          from '@material-ui/core/Paper'

import Menu from './Menu.tsx'

const styles = theme => ({
  root: {
    flexGrow    : 1,
  },
  grow: {
    flexGrow    : 1,
  },
  appbar: {
    marginBottom: theme.spacing.unit,
  },
})

interface ComponentProps {
  classes: {
    root    : string,
    grow    : object,
    appbar  : object,
  },
  title     : string,
  menu      : any,
  workspace : any,
}

const AdministratorLayout = (props: ComponentProps) => (
	<div className={props.classes.root}>
		<AppBar position="static" className={props.classes.appbar}>
			<Toolbar>
				<Typography variant="h6" color="inherit" className={props.classes.grow}>
					{props.title}
				</Typography>
			</Toolbar>
		</AppBar>
		<Grid container spacing={8}>
			<Grid item xs={2}>
				<Paper>
          <Menu list={props.menu} />
        </Paper>
			</Grid>
			<Grid item xs={10}>
				{props.workspace}
			</Grid>
		</Grid>
	</div>
)

export default withStyles(styles)(AdministratorLayout)
