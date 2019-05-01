import React, { Component } from 'react';
import { Query } from 'react-apollo';

import FETCH_REGIONS from '../../../queries/fetchRegions';

import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
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
	tableRow: {
		cursor: 'pointer',
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
		label	:	'Переименовать',
	},
	{
		link	: '/admin/regions/delete',
		icon	: DeleteForeverIcon,
		label	:	'Удалить',
	},
	{
		link	: '/admin/regions/members',
		icon	: PeopleIcon,
		label	:	'Участники',
	},
])

class Regions extends Component {  
	state = {
		currentItem: '',
	}
	
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
		this.setState({ currentItem: id })
	}
	
	render() {
		const { classes } = this.props;
		const { currentItem } = this.state
		
		return (
			<Query query={FETCH_REGIONS}>
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
						return 
					}
					
					const { regions } = data
					
					if (loading || !regions) {
						return (
							<div className={classes.fullHeight}>
								<CircularProgress className={classes.centeral} color="primary" />
							</div>
						)
					}
					
					return (
						<div>
							<Typography  variant="h6" color="inherit">
								{"Регионы"}
							</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Наименование</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{regions.map(item => (
										<TableRow hover
											key={item.id} 
											className={classes.tableRow}
											selected={currentItem === item.id}
											onClick={() =>this.selectItem(item.id)}
										>
											<TableCell component="th" scope="row" >
												{item.name}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					);
				}}
			</Query>
		)
	}	
}

export default withStyles(styles)(Regions)
