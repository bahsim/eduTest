import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from "react-apollo";

import DeleteGraphQL from '../../../common/hoc/DeleteGraphQL'

import FETCH_REGIONS from '../../../../queries/fetchRegions';
import FETCH_REGION from '../../../../queries/fetchRegion';
import DELETE_REGION from '../../../../mutations/deleteRegion';

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
	button: {
    margin: theme.spacing.unit,
  },
	title: {
		marginBottom: theme.spacing.unit*3,
	},
	margin: {
    margin: theme.spacing.unit,
  },
})

const panelMain = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
])

const Breadcrumbs = () => ([
	{
		type	: 'link',
		label	:	'Регионы',
		link	: '/admin/regions',
	},
	{
		type	: 'link',
		label	:	'',
		link	: '/admin/regions',
	},
	{
		type	: 'label',
		label	:	'Удаление',
	},
])

class DeleteRegion extends Component {  
	state = {
		id: '',
	}
	
	componentDidMount() {
		const { setPanel, queryData, setBreadcrumbs } = this.props
		const { id } = this.props.match.params

		const panel = panelMain()		
		panel[0].link += `/${id}`
		
		setPanel(panel)
		this.setState({ id })
		
		const breadcrumbs = Breadcrumbs()		
		breadcrumbs[1].link += `/${id}`
		breadcrumbs[1].label = queryData.name
		
		setBreadcrumbs(breadcrumbs)
	}	
	
	handleSubmit = (e) => {
		e.preventDefault()
		
		const { history, action } = this.props
		const { id } = this.state
		
		action({ variables: { id } })
			.then(() => history.replace('/admin/regions'))
	}
	
	render() {
		const { classes, queryData } = this.props
		const { id } = this.state
		
		return (
			<Grid container>
				<Grid item xs={6}>
					<Typography  variant="h6" color="inherit" className={classes.title, classes.margin}>
						{queryData.name}
					</Typography>
					<form 
						onSubmit={this.handleSubmit} 
						noValidate 
						autoComplete="off"
					>
						<Button 
							type="submit" 
							variant="contained" 
							color="secondary" 
							className={classes.button}
						>
							Удалить
						</Button>
					</form>
				</Grid>
			</Grid>
		)
	}	
}

const DeleteRegionGQL =  (
	DeleteGraphQL(
		withStyles(styles)(
			DeleteRegion
		)
	)
)

const DeleteRegionCover = (props) => {
	
	const queryProps = {
		query				: FETCH_REGION,
		mutation		: DELETE_REGION,
		updateGQL		: FETCH_REGIONS,
		updateData	: 'regions',
		actionName	: 'deleteRegion',
		dataName		: 'region',
	}
	
	queryProps.queryParams = { 
		id: props.match.params.id
	}
	
	return <DeleteRegionGQL {...props} queryProps={queryProps} />
}

export default withRouter(DeleteRegionCover)
