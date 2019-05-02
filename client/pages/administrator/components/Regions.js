import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo';

import ViewGraphQL from '../containers/ViewGraphQL'

import FETCH_REGIONS from '../../../queries/fetchRegions';

import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import AddIcon from '@material-ui/icons/Add'
import PageviewIcon from '@material-ui/icons/Pageview'

const styles = theme => ({
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
		link	: '/admin/regions',
		icon	: PageviewIcon,
		label	:	'Открыть',
	},
])

const Breadcrumbs = () => ([
	{
		type	: 'label',
		label	:	'Регионы',
	},
])

class Regions extends Component {  
	state = {
		currentItem: '',
	}
	
	componentDidMount() {
		const { setPanel, setBreadcrumbs } = this.props
		
		setPanel(panelList())
		setBreadcrumbs(Breadcrumbs())
	}	
	
	selectItem = (id) => {
		const { setPanel } = this.props
		
		const panel = panelListSelected()		
		panel[1].link += `/${id}`
		
		setPanel(panel)
		this.setState({ currentItem: id })
	}
	
	openItem = (id) => {
		const { history } = this.props
		
		history.replace(`/admin/regions/${id}`)
	}
	
	render() {
		const { classes, queryData } = this.props;
		const { currentItem } = this.state
		
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Наименование</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{queryData.map(item => (
						<TableRow hover
							key={item.id} 
							className={classes.tableRow}
							selected={currentItem === item.id}
							onClick={() => this.selectItem(item.id)}
							onDoubleClick={() => this.openItem(item.id)}
						>
							<TableCell component="th" scope="row" >
								{item.name}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}	
}

const ViewGraphQLProps = {
	query			: FETCH_REGIONS,
	dataName	: 'regions',
}

export default ViewGraphQL(ViewGraphQLProps)(
	withStyles(styles)(withRouter(Regions))
)