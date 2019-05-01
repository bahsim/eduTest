import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { Mutation, Query } from "react-apollo";

import DeleteGraphQL from '../containers/DeleteGraphQL'

import FETCH_REGIONS from '../../../queries/fetchRegions';
import FETCH_REGION from '../../../queries/fetchRegion';
import DELETE_REGION from '../../../mutations/deleteRegion';

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
})

const panel = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
])

class DeleteRegion extends Component {  
	state = {
		id: '',
	}
	
	componentDidMount() {
		const { setPanel } = this.props
		const { id } = queryString.parse(location.search)

		setPanel(panel())
		this.setState({ id })
	}	
	
	handleSubmit = (e) => {
		e.preventDefault()
		
		const { history, action } = this.props
		const { id } = this.state
		
		action({ variables: { id } })
		history.replace('/admin/regions')
	}
	
	render() {
		const { classes, queryData } = this.props
		const { id } = this.state
		
		return (
			<Grid container>
				<Grid item xs={6}>
					<Typography  variant="h6" color="inherit" className={classes.title}>
						{`Удаление записи ${queryData.name}`}
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
							Продолжить
						</Button>
					</form>
				</Grid>
			</Grid>
		)
	}	
}

const DeleteGraphQLProps = {
	query				: FETCH_REGION,
	mutation		: DELETE_REGION,
	updateGQL		: FETCH_REGIONS,
	updateData	: 'regions',
	actionName	: 'deleteRegion',
	dataName		: 'region',
}

export default DeleteGraphQL(DeleteGraphQLProps)(
	withStyles(styles)(
		withRouter(DeleteRegion)
	)
)