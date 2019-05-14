import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import queryString    from 'query-string'

import { withStyles } from '@material-ui/core/styles'
import Grid        		from '@material-ui/core/Grid'
import Paper          from '@material-ui/core/Paper'
import AddIcon 			  from '@material-ui/icons/Add'
import PageviewIcon   from '@material-ui/icons/Pageview'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import DeleteIcon     from '@material-ui/icons/DeleteForever'

import Breadcrumbs    from './Breadcrumbs.tsx'
import ComandsPanel   from './ComandsPanel.tsx'

import DatasetOneLevel  from '../actions/DatasetOneLevel.js'
import DatasetWithGroup from '../actions/DatasetWithGroup.js'

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

const panelLink = (link, icon, label) => ({ link, icon, label })

const BREADCRUMBS_DEL_TEST  = 'Удаление'
const LABEL_BACK            = 'Назад'
const LABEL_ADD             = 'Добавить'
const LABEL_DELETE          = 'Удалить'
const LABEL_OPEN            = 'Открыть'

interface WorkspaceProps {
  classes: {
    breadcrumbs : object,
    panel       : object,
    mainspace   : object,
  },
  location      : {
    search      : object,
  },
  children      : any,
  datasetType   : string,
  componentType : string,
  role          : string,
  baseURL       : string,
  labelName     : string,
  labelNew      : string,
  history       : { replace: (url: string) => any },
  match         : { params: { groupId: string } },
}

interface WorkspaceState {
  routeQueryParams		: {
    current           : object,
  },
  mainspaceTop				: number,
  panelContent				: any,
  breadcrumbsContent	: any,
  groupName	          : string,
}

class Workspace extends Component<WorkspaceProps, WorkspaceState> {

  state = {
		routeQueryParams		: queryString.parse(this.props.location.search),
		mainspaceTop				: 0,
		panelContent				: [],
		breadcrumbsContent	: [],
		groupName	          : '',
	}

  mainspace

  followLink = (link)   => this.props.history.replace(link)

  defineDataset = () => {
    const params = {
      followLink  : (link) => this.props.history.replace(link),
      setState    : (state) => this.setState(state),
      getState    : (state) => this.state[state],
      props       : this.props,
    }
    switch (this.props.datasetType) {
      case 'oneLevel'   : return new DatasetOneLevel(params)
      case 'withGroup'  : return new DatasetWithGroup(params)
    }
  }
  dataset: any  = this.defineDataset()

  componentDidMount() {
    this.dataset.putPanelContentDefault()
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
		const { classes, children, datasetType, componentType } = this.props
		const {
			mainspaceTop,
			panelContent,
			breadcrumbsContent,
		} = this.state

		const registryHeight = ((window.innerHeight - mainspaceTop) - 45 ) + 'px'
		const styleMainspace = {height: registryHeight, overflow: 'auto'}

		return (
			<Fragment>
				<Paper className={classes.breadcrumbs}>
          <Breadcrumbs list={breadcrumbsContent} />
				</Paper>
				<Paper className={classes.panel}>
					<ComandsPanel list={panelContent} />
				</Paper>
				<div ref={(el) => this.mainspace = el }>
					<Paper className={classes.mainspace} style={styleMainspace}>
            {componentType === "viewList" &&
              React.Children.map(children, child => (
                React.cloneElement(child, {
                  onClick       : this.dataset.handleMainAction,
                  onDoubleClick : this.dataset.handleSecondAction,
                  extraAction   : this.dataset.handleExtraAction,
                  current: this.state.routeQueryParams.current,
                })
              ))
            }
            {componentType !== "viewList" &&
              <Grid container >
          			<Grid item xs={6}>
                  {React.Children.map(children, child => (
                    React.cloneElement(child, {
                      onClick     : this.dataset.handleMainAction,
                      extraAction : this.dataset.handleExtraAction,
                    })
                  ))}
                </Grid>
          		</Grid>
            }
					</Paper>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(withRouter(Workspace))
