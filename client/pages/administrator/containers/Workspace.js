import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  panel: {
    marginBottom: theme.spacing.unit,
  },
	mainspace: {
		padding: theme.spacing.unit,
  },
	button: {
		margin: theme.spacing.unit/2,
		marginRight: theme.spacing.unit*2,
	},
	icon: {
		marginRight: theme.spacing.unit,
	}
})

const Menu = (list, classes, history) => (
	list.map((el,idx) => (
		<Button key={idx} className={classes.button} 
			onClick={() => history.replace(el.link)}
		>
			<el.icon className={classes.icon}/>
			{el.label}
		</Button>
	))
)

class Workspace extends Component {  
	state = {
		mainspaceTop: 0,
		panelContent: [],
	}
	
	componentDidMount() {
		this.getRegistryTop()
	}	
	
	componentDidUpdate() {
		this.getRegistryTop()
	}
	
	getRegistryTop() {
		const mainspaceTop = this.mainspace.getBoundingClientRect().top;		
		if (this.state.mainspaceTop !== mainspaceTop) {
			this.setState({ mainspaceTop })
		}
	}
	
	render() {
		const { classes, MainComponent, history } = this.props
		const { mainspaceTop, panelContent } = this.state
		
		const registryHeight = ((window.innerHeight - mainspaceTop) - 30 ) + 'px'
		const styleMainspace = {height: registryHeight, overflow: 'auto'}
		
		return (
			<div>
				<Paper className={classes.panel}>
					{Menu(panelContent, classes, history)}
				</Paper>
				<div ref={(el) => this.mainspace = el }>
					<Paper className={classes.mainspace} style={styleMainspace}>
						<MainComponent
							setPanel={panelContent => this.setState({panelContent})}
						/>
					</Paper>
				</div>
			</div>
		);
	}	
}

export default withStyles(styles)(withRouter(Workspace))