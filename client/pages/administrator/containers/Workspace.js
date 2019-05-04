import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const styles = theme => ({
  panel: {
    marginBottom: theme.spacing.unit,
  },
	mainspace: {
		padding: theme.spacing.unit*2,
  },
	button: {
		margin: theme.spacing.unit/2,
		marginRight: theme.spacing.unit*2,
	},
	emptyMenu: {
		padding: theme.spacing.unit*1.5,
	},
  breadcrumbs: {
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
	breadcrumb: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		textTransform: 'uppercase'
	},
	icon: {
		marginRight: theme.spacing.unit,
	}
})

const Menu = (that, list, classes, history) => (
	list.length === 0 ? 
		<div className={classes.emptyMenu}><br/></div>
	:
		list.map((el,idx) => {
			switch (el.type) {
				case 'action':
					return(
						<Button key={idx} className={classes.button} 
							onClick={() => that.setState({mainComponentAction: el.action}, () =>{
								that.setState({mainComponentAction: ''})
							})}
						>
							<el.icon className={classes.icon}/>
							{el.label}
						</Button>
					)
				case 'link':
					return(
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

const BreadcrumbsPanel = (list, classes, history) => (
	list.map((el,idx) => (
		<Typography key={idx} color="textPrimary" className={classes.breadcrumb}>
			{el}
		</Typography>
	))
)

class Workspace extends Component {  
	state = {
		mainspaceTop				: 0,
		panelContent				: [],
		breadcrumbsContent	: [],
		mainComponentAction	: '',
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
		const { 
			mainspaceTop, 
			panelContent, 
			breadcrumbsContent, 
			mainComponentAction 
		} = this.state
		
		const registryHeight = ((window.innerHeight - mainspaceTop) - 45 ) + 'px'
		const styleMainspace = {height: registryHeight, overflow: 'auto'}
		
		return (
			<div>
				<Paper className={classes.breadcrumbs}>
					<Breadcrumbs separator=">>" arial-label="Breadcrumb">
						{BreadcrumbsPanel(breadcrumbsContent, classes, history)}
					</Breadcrumbs>
				</Paper>
				<Paper className={classes.panel}>
					{Menu(this, panelContent, classes, history)}
				</Paper>
				<div ref={(el) => this.mainspace = el }>
					<Paper className={classes.mainspace} style={styleMainspace}>
						<MainComponent
							panelAction={mainComponentAction}
							height={registryHeight}
							setPanel={panelContent => this.setState({panelContent})}
							setBreadcrumbs={breadcrumbsContent => this.setState({breadcrumbsContent})}
						/>
					</Paper>
				</div>
			</div>
		);
	}	
}

export default withStyles(styles)(withRouter(Workspace))