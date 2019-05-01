import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import NewGraphQL from '../containers/NewGraphQL'

import FETCH_REGIONS from '../../../queries/fetchRegions';
import ADD_REGION from '../../../mutations/addRegion';

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
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
	
	handleSubmit = (e) => {
		e.preventDefault()
		
		const { history, action } = this.props
		const name = e.target.name.value.trim()
		
		if (name === '') return
		
		action({ variables: { name } })
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
					<form 
						onSubmit={this.handleSubmit} 
						noValidate 
						autoComplete="off"
					>
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
				</Grid>
			</Grid>
		);
	}	
}

const NewGraphQLProps = {
	mutation		: ADD_REGION,
	updateGQL		: FETCH_REGIONS,
	updateData	: 'regions',
	actionName	: 'addRegion',
}

export default NewGraphQL(NewGraphQLProps)(
	withStyles(styles)(
		withRouter(NewRegion)
	)
)