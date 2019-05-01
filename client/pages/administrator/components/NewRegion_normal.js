import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation } from "react-apollo";

import FETCH_REGIONS from '../../../queries/fetchRegions';
import ADD_REGION from '../../../mutations/addRegion';

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

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
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
	button: {
    margin: theme.spacing.unit,
  },
})

const panel = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
])

class NewRegion extends Component {  
	state = {}
	
	componentDidMount() {
		const { setPanel } = this.props
		
		setPanel(panel())
	}	
	
	handleSubmit = (e, addRegion) => {
		e.preventDefault()
		
		const { history } = this.props
		const name = e.target.name.value.trim()
		
		if (name === '') return
		
		addRegion({ variables: { name } })
		history.replace('/admin/regions')
	}
	
	render() {
		const { classes } = this.props
		
		return (
			<Grid container >
				<Grid item xs={6}>
					<Typography  variant="h6" color="inherit">
						{"Новый регион"}
					</Typography>
					<Mutation 
						mutation={ADD_REGION}
						update={(cache, { data: { addRegion } }) => {
							const { regions } = cache.readQuery({ query: FETCH_REGIONS });
							cache.writeQuery({
								query: FETCH_REGIONS,
								data: { regions: regions.concat([addRegion]) },
							});
						}}					
					>
						{(addRegion, { data }) => (
							<form onSubmit={e => this.handleSubmit(e, addRegion)} noValidate autoComplete="off">
								<TextField
									label="Наименование"
									name="name"
									className={classes.textField}
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
		);
	}	
}

export default withStyles(styles)(withRouter(NewRegion))