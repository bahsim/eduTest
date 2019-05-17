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
  content: {
    marginTop     : theme.spacing.unit*2,
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
    content     : string,
  },
  location      : {
    search      : object,
  },
  children      : any,
  content       : any,
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
}

class Workspace extends Component<WorkspaceProps, WorkspaceState> {

  state = {
		routeQueryParams		: queryString.parse(this.props.location.search),
		mainspaceTop				: 0,
		panelContent				: [],
		breadcrumbsContent	: [],
    contentData         : {}
	}

  mainspace

  followLink = (link)   => this.props.history.replace(link)

  defineActions = () => {
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

		const registryHeight = ((window.innerHeight - mainspaceTop) - 45 ) + 'px'
		const styleMainspace = {height: registryHeight, overflow: 'auto'}

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
					<Paper className={classes.mainspace} style={styleMainspace}>
            {componentType === "viewList" &&
              React.Children.map(children, child => (
                React.cloneElement(child, {
                  onClick       : this.actions.handleMainAction,
                  onDoubleClick : this.actions.handleSecondAction,
                  extraAction   : this.actions.handleExtraAction,
                  current       : this.state.routeQueryParams.current,
                })
              ))
            }
            {componentType !== "viewList" &&
              <Fragment>
                <Grid container >
            			<Grid item xs={6}>
                    {React.Children.map(children, child => (
                      React.cloneElement(child, {
                        onClick     : this.actions.handleMainAction,
                        extraAction : this.actions.handleExtraAction,
                      })
                    ))}
                  </Grid>
            		</Grid>
                {Content &&
                  <div className={classes.content}>
                    <Content
                      data={contentData}
                      {...content[componentType].params}
                    />
                  </div>
                }
              </Fragment>
            }
					</Paper>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(withRouter(Workspace))
