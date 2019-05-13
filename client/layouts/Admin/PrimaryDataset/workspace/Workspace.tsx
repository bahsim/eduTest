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

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

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
  datasetType   : any,
  componentType : any,
  baseURL       : any,
  labelName     : any,
  labelNew      : any,
  history       : { replace: (url: string) => any },
}

interface WorkspaceState {
  routeQueryParams		: {
    current           : object,
  },
  mainspaceTop				: number,
  panelContent				: any,
  breadcrumbsContent	: any,
  mainComponentAction	: string,
}

class Workspace extends Component<WorkspaceProps, WorkspaceState> {

  state = {
		routeQueryParams		: queryString.parse(this.props.location.search),
		mainspaceTop				: 0,
		panelContent				: [],
		breadcrumbsContent	: [],
		mainComponentAction	: '',
	}

  mainspace

	componentDidMount() {
    this.putPanelContentDefault()
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

  putPanelContentDefault = () => {
    const { datasetType, componentType, role,
            baseURL, labelName, labelNew } = this.props

    let panelContent = [], breadcrumbsContent = []

    if (datasetType === 'oneLevel') {
      switch (`${datasetType}-${componentType}`) {
        case 'oneLevel-viewList':
          breadcrumbsContent.push(labelName)
          panelContent.push(panelLink(`${baseURL}/new`, AddIcon, LABEL_ADD))
          break
        case 'oneLevel-newItem':
          breadcrumbsContent.push(labelName, labelNew)
          panelContent.push(panelLink(baseURL, ArrowBackIcon, LABEL_BACK))
          break
        case 'oneLevel-viewItem':
          break
        case 'oneLevel-deleteItem':
          break
      }
    }
    if (datasetType === 'withGroup') {
      switch (`${datasetType}-${componentType}-${role}`) {
        case 'withGroup-viewList-groups':
          breadcrumbsContent.push(labelName)
          break
        case 'withGroup-viewList-items':
          const { groupId } = this.props.match.params
          breadcrumbsContent.push(labelName)
          panelContent.push(
            panelLink(`${baseURL}?current=${groupId}`, ArrowBackIcon, LABEL_BACK),
            panelLink(`${baseURL}/groups/${groupId}/new`, AddIcon, LABEL_ADD)
          )
          break
      }
    }

    this.setState({panelContent, breadcrumbsContent})
  }

  handleMainAction = (...args) => {
    const { datasetType, componentType, role, history,
            baseURL, labelName } = this.props

    if (datasetType === 'oneLevel') {
      switch (`${datasetType}-${componentType}`) {
        case 'oneLevel-viewList': {
          const breadcrumbsContent = [labelName, args[1]]
          const panelContent = [
            panelLink(`${baseURL}/new`, AddIcon, LABEL_ADD),
            panelLink(`${baseURL}/items/${args[0]}`, PageviewIcon, LABEL_OPEN)
          ]
          this.setState({panelContent, breadcrumbsContent})
          break
        }
        case 'oneLevel-newItem':
        case 'oneLevel-deleteItem':
          history.replace(`${baseURL}?current=${args[0]}`)
          break
        case 'oneLevel-viewItem': {
          const breadcrumbsContent = [labelName, args[1]]
          const panelContent = this.state.panelContent
          this.setState({panelContent, breadcrumbsContent})
          break
        }
      }
    }
    if (datasetType === 'withGroup') {
      switch (`${datasetType}-${componentType}-${role}`) {
        case 'withGroup-viewList-groups':
          history.replace(`${baseURL}/groups/${args[0]}`)
          break
      }
    }
  }

  handleExtraAction = (...args) => {
    const { datasetType, componentType, history,
            baseURL, labelName } = this.props

    switch (`${datasetType}-${componentType}`) {
      case 'oneLevel-viewList':
        this.props.history.replace(`${baseURL}/items/${args[0]}`)
        break
      case 'oneLevel-newItem':
        break
      case 'oneLevel-viewItem': {
        const breadcrumbsContent = [ labelName, args[1] ]
        const panelContent = [
    			panelLink(`${baseURL}?current=${args[0]}`, ArrowBackIcon, LABEL_BACK),
    			panelLink(`${baseURL}/items/${args[0]}/delete`, DeleteIcon, LABEL_DELETE)
    		]
        this.setState({ panelContent, breadcrumbsContent})
        break
      }
      case 'oneLevel-deleteItem': {
        const breadcrumbsContent = [ labelName, args[1], BREADCRUMBS_DEL_TEST ]
        const panelContent = [
          panelLink(`${baseURL}/items/${args[0]}`, ArrowBackIcon, LABEL_BACK)
        ]
        this.setState({ panelContent, breadcrumbsContent})
        break
      }
    }
  }

	render() {
		const { classes, children, datasetType, componentType } = this.props
		const {
			mainspaceTop,
			panelContent,
			breadcrumbsContent,
			mainComponentAction
		} = this.state

		const registryHeight = ((window.innerHeight - mainspaceTop) - 45 ) + 'px'
		const styleMainspace = {height: registryHeight, overflow: 'auto'}

		return (
			<Fragment>
				<Paper className={classes.breadcrumbs}>
          <Breadcrumbs list={breadcrumbsContent} />
				</Paper>
				<Paper className={classes.panel}>
					<ComandsPanel
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
            {componentType === "viewList" &&
              React.Children.map(children, child => (
                React.cloneElement(child, {
                  onClick       : this.handleMainAction,
                  onDoubleClick : this.handleExtraAction,
                  panelAction   : mainComponentAction,
    							setPanel      : panelContent => {
                    this.setState({panelContent})
                  },
    							setBreadcrumbs: breadcrumbsContent => {
                    this.setState({breadcrumbsContent})
                  },
                  current: this.state.routeQueryParams.current,
                })
              ))
            }
            {componentType !== "viewList" &&
              <Grid container >
          			<Grid item xs={6}>
                  {React.Children.map(children, child => (
                    React.cloneElement(child, {
                      onClick: this.handleMainAction,
                      extraAction: this.handleExtraAction,
                      panelAction: mainComponentAction,
                      setPanel: panelContent => {
                        this.setState({panelContent})
                      },
                      setBreadcrumbs: breadcrumbsContent => {
                        this.setState({breadcrumbsContent})
                      },
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
