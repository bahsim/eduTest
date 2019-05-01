import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import EditGraphQL from '../containers/EditGraphQL'

import FETCH_REGION from '../../../queries/fetchRegion';
import EDIT_REGION from '../../../mutations/editRegion';

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
	
	handleSubmit = e => {
		e.preventDefault()
		
		const { history, action } = this.props
		const name = e.target.name.value.trim()
		const { id } = this.state
		
		if (name === '') return
		
		action({ variables: { id, name } })
		history.replace('/admin/regions')
	}
	
	render() {
		const { classes, queryData } = this.props
		
		return (
			<Grid container >
				<Grid item xs={6}>
					<Typography  variant="h6" color="inherit">
						{"Переименование"}
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
							defaultValue={queryData.name}
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
		)
	}	
}

const EditGraphQLProps = {
	query			: FETCH_REGION,
	mutation	: EDIT_REGION,
	dataName	: 'region',
}

export default EditGraphQL(EditGraphQLProps)(
	withStyles(styles)(
		withRouter(EditRegion)
	)
)