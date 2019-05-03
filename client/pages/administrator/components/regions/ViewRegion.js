import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import EditGraphQL from '../../../common/hoc/EditGraphQL'

import FETCH_REGION from '../../../../queries/fetchRegion'
import EDIT_REGION from '../../../../mutations/editRegion'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import PeopleIcon from '@material-ui/icons/People'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
	button: {
    margin: theme.spacing.unit,
  },
	margin: {
    margin: theme.spacing.unit,
  },	
})

const panelMain = () => ([
	{
		link	: '/admin/regions',
		icon	: ArrowBackIcon,
		label	:	'Назад',
	},
	{
		link	: '/admin/regions',
		icon	: PeopleIcon,
		label	:	'Участники',
	},
	{
		link	: '/admin/regions',
		icon	: DeleteForeverIcon,
		label	:	'Удалить регион',
	},
])

const Breadcrumbs = () => ([
	{
		type	: 'link',
		label	:	'Регионы',
		link	: '/admin/regions',
	},
	{
		type	: 'label',
		label	:	'Регионы',
	},
])

class ViewRegion extends Component {  
	state = {
		edit: false,
	}
	
	componentDidMount() {
		const { id } = this.props.queryProps.queryParams
		
		const { setPanel } = this.props
		const panel = panelMain()		
		
		panel[1].link += `/${id}/members`
		panel[2].link += `/${id}/delete`
		
		setPanel(panel)
		
		this.setBreadcrumbs()
	}
	
	setBreadcrumbs = () => {
		const { queryData, setBreadcrumbs } = this.props
		
		const breadcrumbs = Breadcrumbs()		
		breadcrumbs[1].label = queryData.name
		
		setBreadcrumbs(breadcrumbs)
	}
	
	handleSubmit = e => {
		e.preventDefault()
		
		const { history, action, queryProps } = this.props
		const name = e.target.name.value.trim()
		const { id } = queryProps.queryParams
		
		if (name === '') return
		
		action({ variables: { id, name } })
			.then(() => {
				this.setState({edit: false})
				this.setBreadcrumbs()
			})
	}
	
	render() {
		const { classes, queryData } = this.props
		const { edit } = this.state
		
		return (
			<Grid container >
				<Grid item xs={6}>
					<Typography  variant="h6" color="inherit" className={classes.margin}>
						{queryData.name}
						{!edit &&
							<IconButton 
								aria-label="Delete" 
								onClick={() => this.setState({edit: true})}
							>
								<EditIcon fontSize="small" />
							</IconButton>
						}
					</Typography>					
					{edit &&
						<form 
							onSubmit={this.handleSubmit} 
							noValidate 
							autoComplete="off"
						>
							<TextField
								label="Новое наименование"
								name="name"
								defaultValue={queryData.name}
								className={classes.textField}
								margin="normal"
								autoFocus
							/>
							<Button 
								type="submit" 
								variant="contained" 
								className={classes.button}
								color="primary"
							>
								Сохранить
							</Button>
							<Button 
								variant="contained" 
								className={classes.button}
								onClick={() => this.setState({edit: false})}
							>
								Закрыть
							</Button>
						</form>
					}
				</Grid>
			</Grid>
		)
	}	
}

const ViewRegionGQL =  (
	EditGraphQL(
		withStyles(styles)(
			ViewRegion
		)
	)
)

const ViewRegionCover = (props) => {
	
	const queryProps = {
		query				: FETCH_REGION,
		mutation		: EDIT_REGION,
		dataName		: 'region',
	}
	
	queryProps.queryParams = { 
		id: props.match.params.id
	}
	
	return <ViewRegionGQL {...props} queryProps={queryProps} />
}

export default withRouter(ViewRegionCover)
