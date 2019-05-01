import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { Mutation, Query } from "react-apollo";

import FETCH_REGIONS from '../../../queries/fetchRegions';
import FETCH_REGION from '../../../queries/fetchRegion';
import EDIT_REGION from '../../../mutations/editRegion';

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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
  fullHeight: {
		position: 'relative',
		height: '100%'
	},
	centeral: {
    position: 'absolute',
		top: '50%',
    left: '50%',
		transform: 'translate(-50%, -50%)',
  },
})

const panel = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
])

class EditRegion extends Component {  
	state = {
		id: '',
	}
	
	componentDidMount() {
		const { setPanel } = this.props
		const { id } = queryString.parse(location.search)

		setPanel(panel())
		this.setState({ id })
	}	
	
	handleSubmit = (e, editRegion) => {
		e.preventDefault()
		
		const { history } = this.props
		const name = e.target.name.value.trim()
		const { id } = this.state
		
		if (name === '') return
		
		editRegion({ variables: { id, name } })
		history.replace('/admin/regions')
	}
	
	render() {
		const { classes } = this.props
		const { id } = this.state
		
		return (
			<Query query={FETCH_REGION} variables={{ id }}>
				{({ data, error, loading, refetch }) => {
					
					if (error) {
						return (
							<div className={classes.fullHeight}>
								<div className={classes.centeral}>
									<Typography  variant="h6" color="inherit">
										{`Error! ${error.message}`}
									</Typography>
								</div>
							</div>
						)
					}
					
					const { region } = data
					
					if (loading || !region) {
						return (
							<div className={classes.fullHeight}>
								<CircularProgress className={classes.centeral} color="primary" />
							</div>
						)
					}
					
					return (
						<Grid container >
							<Grid item xs={6}>
								<Typography  variant="h6" color="inherit">
									{"Переименование"}
								</Typography>
								<Mutation mutation={EDIT_REGION}>
									{(editRegion, { data }) => (
										<form onSubmit={e => this.handleSubmit(e, editRegion)} noValidate autoComplete="off">
											<TextField
												label="Наименование"
												name="name"
												className={classes.textField}
												defaultValue={region.name}
												margin="normal"
											/>
											<Button 
												type="submit" 
												variant="contained" 
												className={classes.button}
												color="primary"
											>
												Сохранить
											</Button>
										</form>
									)}
								</Mutation>
							</Grid>
						</Grid>
					)
				}}
			</Query>
		);
	}	
}

export default withStyles(styles)(withRouter(EditRegion))