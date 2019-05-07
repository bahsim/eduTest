import React from 'react';
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const styles = theme => ({
	button: {
		margin      : theme.spacing.unit/2,
		marginRight : theme.spacing.unit*2,
	},
	emptyMenu: {
		padding     : theme.spacing.unit*1.5,
	},
  icon: {
		marginRight : theme.spacing.unit,
	}
})

interface MenuProps {
  onClick : (action: string) => void,
  list    : any,
  classes : any,
  history : any,
}

const Menu = ({ onClick, list, classes, history }: MenuProps) => (
	list.length === 0 ?
		<div className={classes.emptyMenu}><br/></div>
	:
		list.map((el,idx) => {
			switch (el.type) {
				case 'action':
					return (
						<Button key={idx} className={classes.button}
              onClick={() => onClick(el.action)}
						>
							<el.icon className={classes.icon}/>
							{el.label}
						</Button>
					)
				case 'link':
					return (
						<Button key={idx} className={classes.button}
							onClick={() => history.replace(el.link)}
						>
							<el.icon className={classes.icon}/>
							{el.label}
						</Button>
					)
			}
		})
)

export default withStyles(styles)(withRouter(Menu))
