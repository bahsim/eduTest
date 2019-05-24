import React 					from 'react';
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Paper 					from '@material-ui/core/Paper'
import Button 				from '@material-ui/core/Button'
import Link 					from '@material-ui/core/Link'

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

interface ComandsPanelProps {
  onClick 		: (action: string) => void,
  list    		: any,
  classes: {
		button		: object,
		emptyMenu	: string,
		icon			: object,
	},
  history: {
	  replace 	: (url: string) => any
	},
}

const ComandsPanel = (props: ComandsPanelProps) => (
	props.list.length === 0 ?
		<div className={props.classes.emptyMenu}><br/></div>
	:
		props.list.map((el,idx) => (
			<Button key={idx} className={props.classes.button}
				onClick={() => props.history.replace(el.link)}
			>
				<el.icon className={props.classes.icon}/>
				{el.label}
			</Button>
		))
)

export default withStyles(styles)(withRouter(ComandsPanel))
