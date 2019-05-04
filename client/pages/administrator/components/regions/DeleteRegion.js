import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from "react-apollo";

import DeleteGraphQL from '../../../common/hoc/DeleteGraphQL'
import { MUTATE_DELETE_REGION } from '../../../../database/mutations'
import { QUERY_REGIONS, QUERY_REGION } from '../../../../database/queries'

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

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_BACK 	= panelLink('/admin/regions', ArrowBackIcon, 'Назад')

const BREADCRUMBS_REGIONS	= 'Регионы'
const BREADCRUMBS_DEL_REGION = 'Удаление'

const LABEL_DELETE 	= 'Удалить'

class DeleteRegion extends Component {  
	state = {
		id: '',
	}
	
	componentDidMount() {
		const { setPanel, queryData, setBreadcrumbs } = this.props
		const { id } = this.props.match.params

		const panel = [{...PANEL_BACK}]
		panel[0].link += `/${id}`
		setPanel(panel)
		
		setBreadcrumbs([BREADCRUMBS_REGIONS, queryData.name, BREADCRUMBS_DEL_REGION])
		
		this.setState({ id })
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
							{LABEL_DELETE}
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
		query			: QUERY_REGION,
		mutation	: MUTATE_DELETE_REGION,
		update		: QUERY_REGIONS,
	}
	
	queryProps.queryParams = { 
		id: props.match.params.id
	}
	
	return <DeleteRegionGQL {...props} queryProps={queryProps} />
}

export default withRouter(DeleteRegionCover)
