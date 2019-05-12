import React, { Component } from 'react'
import { withRouter } 			from 'react-router-dom'

import EditGraphQL from '../../../../database/components/EditGraphQL'

import { withStyles }     from '@material-ui/core/styles'
import Typography         from '@material-ui/core/Typography'
import TextField          from '@material-ui/core/TextField'
import Grid               from '@material-ui/core/Grid'
import Button             from '@material-ui/core/Button';
import IconButton         from '@material-ui/core/IconButton'
import ArrowBackIcon      from '@material-ui/icons/ArrowBack'
import EditIcon           from '@material-ui/icons/Edit'
import DeleteForeverIcon  from '@material-ui/icons/DeleteForever'

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
	button: {
    margin      : theme.spacing.unit,
  },
	margin: {
    margin      : theme.spacing.unit,
  },
  content: {
    margin      : theme.spacing.unit
  }
})

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const LABEL_NEW_NAME 	= 'Новое наименование'
const LABEL_SAVE 			= 'Сохранить'
const LABEL_CLOSE 		= 'Закрыть'
const LABEL_BACK      = 'Назад'
const LABEL_DELETE    = 'Удалить'

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: string, icon: any, label: string }
}

interface BreadcrumbsArray {
  length: number;
  [item: number]: string;
}

interface ComponentProps {
  rootLink    : string,
  breadcrumbs : BreadcrumbsArray,
  children    : any,
  classes: {
    textField : object
    button    : object
    margin    : object
    content   : string
  },
  setPanel      : (PanelArray) => any
  setBreadcrumbs: (BreadcrumbsArray) => any
  queryProps    : {
    queryParams : {
      id  : string
    }
  },
  queryData     : any
  action        : (args: { variables: { id: string, name: string }}) => any
}

const ViewRecord = (props) => (
  <EditGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </EditGraphQL>
)

class BaseComponent extends Component<ComponentProps,{}> {
  state = {
    editState: false
  }

  componentDidMount() {
    const panel = [
			panelLink(this.props.rootLink, ArrowBackIcon, LABEL_BACK),
			panelLink(this.props.rootLink, DeleteForeverIcon, LABEL_DELETE)
		]
		panel[1].link += `/${this.props.queryProps.queryParams.id}/delete`
		this.props.setPanel(panel)

		this.setBreadcrumbs()
  }

	setBreadcrumbs = () => {
		this.props.setBreadcrumbs([
      this.props.breadcrumbs,
      this.props.queryData.name
    ])
	}

	handleSubmit = e => {
		e.preventDefault()

		const name = e.target.name.value.trim()
		const { id } = this.props.queryProps.queryParams

		if (name === '') return

		this.props.action({ variables: { id, name }})
			.then(() => {
				this.setState({editState: false})
				this.setBreadcrumbs()
			})
	}

  render() {
    return (
      <div>
    		<Grid container >
    			<Grid item xs={6}>
    				<Typography
              variant="h6"
              color="inherit"
              className={this.props.classes.margin}
            >
    					{this.props.queryData.name}
    					{!this.state.editState &&
    						<IconButton
    							aria-label="Delete"
    							onClick={() => this.setState({editState: true})}
    						>
    							<EditIcon fontSize="small" />
    						</IconButton>
    					}
    				</Typography>
    				{this.state.editState &&
    					<form
    						onSubmit={this.handleSubmit}
    						noValidate
    						autoComplete="off"
    					>
    						<TextField
    							label={LABEL_NEW_NAME}
    							name="name"
    							defaultValue={this.props.queryData.name}
    							className={this.props.classes.textField}
    							margin="normal"
    							autoFocus
    						/>
    						<Button
    							type="submit"
    							variant="contained"
    							className={this.props.classes.button}
    							color="primary"
    						>
    							{LABEL_SAVE}
    						</Button>
    						<Button
    							variant="contained"
    							className={this.props.classes.button}
    							onClick={() => this.setState({editState: false})}
    						>
    							{LABEL_CLOSE}
    						</Button>
    					</form>
    				}
    			</Grid>
    		</Grid>
        <div className={this.props.classes.content}>
          {this.props.children}
        </div>
      </div>
  	)
  }
}

export default withStyles(styles)(withRouter(ViewRecord))
