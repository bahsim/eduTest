import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles'
import Paper          from '@material-ui/core/Paper'

import Breadcrumbs  from './Breadcrumbs.tsx'
import Menu         from './Menu.tsx'

const styles = theme => ({
  panel: {
    marginBottom  : theme.spacing.unit,
  },
	mainspace: {
		padding       : theme.spacing.unit*2,
  },
  breadcrumbs: {
    marginBottom  : theme.spacing.unit,
    paddingLeft   : theme.spacing.unit,
    paddingRight  : theme.spacing.unit,
  },
})

interface WorkspaceProps {
  classes: {
    breadcrumbs : object,
    panel       : object,
    mainspace   : object,
  },
  MainComponent : any,
}

interface WorkspaceState {
  mainspaceTop				: number,
  panelContent				: any,
  breadcrumbsContent	: any,
  mainComponentAction	: string,
}

class Workspace extends Component<WorkspaceProps, WorkspaceState> {

  state = {
		mainspaceTop				: 0,
		panelContent				: [],
		breadcrumbsContent	: [],
		mainComponentAction	: '',
	}

  mainspace

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
		const { classes, MainComponent } = this.props
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
          <Breadcrumbs list={breadcrumbsContent} />
				</Paper>
				<Paper className={classes.panel}>
					<Menu
            list={panelContent}
            onClick={(action) => {
              this.setState({mainComponentAction: action}, () =>{
                this.setState({mainComponentAction: ''})
              })
            }}
          />
				</Paper>
				<div ref={(el) => this.mainspace = el }>
					<Paper className={classes.mainspace} style={styleMainspace}>
						<MainComponent
							panelAction={mainComponentAction}
							height={registryHeight}
							setPanel={panelContent => this.setState({panelContent})}
							setBreadcrumbs={breadcrumbsContent => {
                this.setState({breadcrumbsContent})}
              }
						/>
					</Paper>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Workspace)
