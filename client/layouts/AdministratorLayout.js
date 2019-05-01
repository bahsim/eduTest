import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appbar: {
    marginBottom: theme.spacing.unit,
  },
})

const Menu = (list, history) => (
	<List component="nav">
		{list.map((el,idx) => (
			<div key={idx} onClick={() => history.replace(el.link)}>
				<ListItem button>
					<ListItemIcon>{el.icon}</ListItemIcon>
					<ListItemText primary={el.label} />
				</ListItem>
				<Divider />
			</div>
		))}
	</List>
)

const AdministratorLayout = (props) => {
	const { classes, title, menu, workspace, history } = props
			
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.appbar}>
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			<Grid container spacing={8}>
				<Grid item xs={2}>
					<Paper>{Menu(menu, history)}</Paper>
				</Grid>
				<Grid item xs={10}>
					{workspace}
				</Grid>
			</Grid>
		</div>
	)
}

AdministratorLayout.propTypes = {
  classes		: PropTypes.object.isRequired,
	title			: PropTypes.string.isRequired,
  menu			: PropTypes.array.isRequired,
  workspace	: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(AdministratorLayout))