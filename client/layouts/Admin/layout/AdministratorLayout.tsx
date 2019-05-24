import React, { useState } from 'react'

import { withStyles } from '@material-ui/core/styles'
import AppBar         from '@material-ui/core/AppBar'
import Toolbar        from '@material-ui/core/Toolbar'
import Typography     from '@material-ui/core/Typography'
import Grid           from '@material-ui/core/Grid'
import Paper          from '@material-ui/core/Paper'
import Hidden         from '@material-ui/core/Hidden'
import IconButton     from '@material-ui/core/IconButton'
import MenuIcon       from '@material-ui/icons/Menu'
import Drawer         from '@material-ui/core/Drawer'

import Menu from './AdministratorMenu.tsx'

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
  menuButton: {
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit*2,
  },
})

interface ComponentProps {
  classes: {
    root        : string,
    grow        : object,
    appbar      : object,
    menuButton  : object,
  },
  title         : string,
  menu          : any,
  workspace     : any,
}

const AdministratorLayout = (props: ComponentProps) => {

  const [ drawerOpen, setDrawerOpen ] = useState(false)

  return (
  	<div className={props.classes.root}>
  		<AppBar position="static" className={props.classes.appbar}>
  			<Toolbar>
          <Hidden lgUp>
            <IconButton
              className={props.classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
  				<Typography variant="h6" color="inherit" className={props.classes.grow}>
  					{props.title}
  				</Typography>
  			</Toolbar>
  		</AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div tabIndex={0} role="button" onClick={() => setDrawerOpen(false)}>
          <Menu list={props.menu} />
        </div>
      </Drawer>
  		<Grid container spacing={8}>
        <Hidden mdDown>
          <Grid item xs={2}>
    				<Paper>
              <Menu list={props.menu} />
            </Paper>
    			</Grid>
        </Hidden>
        <Grid item xs={12} lg={10}>
  				{props.workspace}
  			</Grid>
  		</Grid>
  	</div>
  )
}

export default withStyles(styles)(AdministratorLayout)
