import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import queryString    from 'query-string'

import { withStyles } from '@material-ui/core/styles'
import Paper          from '@material-ui/core/Paper'

import Breadcrumbs    from './Breadcrumbs.tsx'
import ComandsPanel   from './ComandsPanel.tsx'

import PrimaryDataSimple    from '../actions/PrimaryDataSimple.js'
import PrimaryDataWithGroup from '../actions/PrimaryDataWithGroup.js'
import SecondaryData        from '../actions/SecondaryData.js'

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
  content: {
    marginTop     : theme.spacing.unit*2,
  },
})

interface WorkspaceProps {
  classes: {
    breadcrumbs : object,
    panel       : object,
    mainspace   : string,
    content     : string,
  },
  location: {
    search      : object,
  },
  children      : any,
  content       : any,
  datasetType   : string,
  componentType : string,
  history       : { replace: (url: string) => any },
}

interface WorkspaceState {
  routeQueryParams		: {
    current           : object,
  },
  mainspaceTop				: number,
  panelContent				: any,
  breadcrumbsContent	: any,
  contentData	        : any,
  scrollTop	          : number,
  roofTop	            : number,
  roofLeft	          : number,
}

class Workspace extends Component<WorkspaceProps, WorkspaceState> {

  state = {
		routeQueryParams		: queryString.parse(this.props.location.search),
		mainspaceTop				: 0,
		panelContent				: [],
		breadcrumbsContent	: [],
    contentData         : {},
    scrollTop           : 0,
    roofTop             : 0,
    roofLeft            : 0,
	}

  mainspace
  mainpaper

  followLink = (link)   => this.props.history.replace(link)

  defineActions = () => {
    const params = {
      followLink  : (link) => this.props.history.replace(link),
      setState    : (state) => this.setState(state),
      getState    : (state) => this.state[state],
      props       : this.props,
    }
    switch (this.props.datasetType) {
      case 'simple'     : return new PrimaryDataSimple(params)
      case 'withGroup'  : return new PrimaryDataWithGroup(params)
      case 'secondary'  : return new SecondaryData(params)
    }
  }
  actions: any  = this.defineActions()

  componentDidMount() {
    this.actions.putPanelContentDefault()
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

  setScrollParams() {
    this.setState({
      scrollTop : this.mainpaper.scrollTop,
      roofTop   : this.mainspace.getBoundingClientRect().top,
      roofLeft  : this.mainspace.getBoundingClientRect().left,
    })
  }

	render() {
		const {
      classes,
      children,
      datasetType,
      componentType,
      content,
    } = this.props

		const {
			mainspaceTop,
			panelContent,
			breadcrumbsContent,
      contentData,
		} = this.state

		const registryHeight = ((window.innerHeight - mainspaceTop) - 12 ) + 'px'
		const styleMainspace = { height: registryHeight, overflow: 'auto' }

    const Content = (
      content && content[componentType] &&  content[componentType].component
    )

		return (
			<Fragment>
				<Paper className={classes.breadcrumbs}>
          <Breadcrumbs list={breadcrumbsContent} />
				</Paper>
				<Paper className={classes.panel}>
					<ComandsPanel list={panelContent} />
				</Paper>
				<div ref={(el) => this.mainspace = el }>
					<Paper>
            <div
              style={styleMainspace}
              ref={(el) => this.mainpaper = el }
              onScroll={() => this.setScrollParams()}
            >
              <div className={classes.mainspace}>
                {React.Children.map(children, child => (
                  React.cloneElement(child, {
                    onClick     : this.actions.handleMainAction,
                    extraAction : this.actions.handleExtraAction,
                    current     : this.state.routeQueryParams.current,
                  })
                ))}
                {Content &&
                  <div className={classes.content}>
                    <Content
                      data={contentData}
                      scrollTop={this.state.scrollTop}
                      roofTop={this.state.roofTop}
                      roofLeft={this.state.roofLeft}
                      {...content[componentType].params}
                    />
                  </div>
                }
              </div>
            </div>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(withRouter(Workspace))
