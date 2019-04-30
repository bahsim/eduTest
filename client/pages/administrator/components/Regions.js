import React, { Component } from 'react';
import { Query } from 'react-apollo';

import query from '../../../queries/fetchRegions';

import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import PeopleIcon from '@material-ui/icons/People'

const styles = theme => ({
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

const panelList = () => ([
	{
		link	: '/admin/regions/new',
		icon	: AddIcon,
		label	:	'Добавить',
	},
])

const panelListSelected = () => ([
	{
		link	: '/admin/regions/new',
		icon	: AddIcon,
		label	:	'Добавить',
	},
	{
		link	: '/admin/regions/edit',
		icon	: EditIcon,
		label	:	'Изменить',
	},
	{
		link	: '/admin/regions/members',
		icon	: PeopleIcon,
		label	:	'Участники',
	},
])

class Regions extends Component {  
	state = {}
	
	componentDidMount() {
		const { setPanel } = this.props
		
		setPanel(panelList())
		
	}	
	
	selectItem = (id) => {
		const { setPanel } = this.props
		
		const panel = panelListSelected()		
		panel[1].link += `?id=${id}`
		panel[2].link += `?id=${id}`
		
		setPanel(panel)
	}
	
	render() {
		const { classes } = this.props;
		return (
			<Query query={query}>
				{({ data: regions, error, loading, refetch }) => {
					if (error) {
						return (
							<div className={classes.fullHeight}>
								<div className={classes.centeral}>
									<Typography  variant="h6" color="inherit">
										{`Error! ${error.message}`}
									</Typography>
								</div>;
							</div>
						)
						return 
					}
					if (loading) {
						return (
							<div className={classes.fullHeight}>
								<CircularProgress className={classes.centeral} color="secondary" />
							</div>
						)
					}
					
					console.log(regions)
					
					return (
						<div onClick={() => this.selectItem('id')}>
							Regions
						</div>
					);
				}}
			</Query>
		)
	}	
}


export default withStyles(styles)(Regions)
