import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import ViewGraphQL from '../containers/ViewGraphQL'

import FETCH_REGION_GROUPS from '../../../queries/fetchRegionGroups'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'


import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
	groupsList: {
		overflow: 'auto',
	}
})

const panelList = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
	{
		link	: '/admin/regions/members/groups/new',
		icon	: AddIcon,
		label	:	'Добавить группу',
	},
])

const panelGroupSelected = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
	{
		link	: '/admin/regions/members/groups/new',
		icon	: AddIcon,
		label	:	'Добавить группу',
	},
	{
		link	: '/admin/regions/members/groups/edit',
		icon	: EditIcon,
		label	:	'Изменить группу',
	},
	{
		link	: '/admin/regions/members/new',
		icon	: AddIcon,
		label	:	'Добавить участника',
	},
])

const panelItemSelected = () => ([
	{
		link		: '/admin/regions',
		icon		: ArrowBackIcon,
		label		:	'Назад',
	},
	{
		link	: '/admin/regions/members/groups/new',
		icon	: AddIcon,
		label	:	'Добавить группу',
	},
	{
		link	: '/admin/regions/members/groups/edit',
		icon	: EditIcon,
		label	:	'Изменить группу',
		type	: 'link',
	},
	{
		link	: '/admin/regions/members/new',
		icon	: AddIcon,
		label	:	'Добавить участника',
		type	: 'link',
	},
	{
		link	: '/admin/regions/members/edit',
		icon	: EditIcon,
		label	:	'Изменить участника',
		type	: 'link',
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
		label	:	'Регион',
		link	: '/admin/regions',
	},
	{
		type	: 'label',
		label	:	'Участники',
	},
])

const groups = [
	{id:'1', name:'Группа 1'},
	{id:'2', name:'Группа 2'},
	{id:'3', name:'Группа 3'},
	{id:'4', name:'Группа 4'},
	{id:'5', name:'Группа 5'},
	{id:'6', name:'Группа 6'},
	{id:'7', name:'Группа 7'},
	{id:'8', name:'Группа 8'},
	{id:'9', name:'Группа 9'},
	{id:'10', name:'Группа 10'},
	{id:'11', name:'Группа 11'},
	{id:'12', name:'Группа 12'},
	{id:'1', name:'Группа 1'},
	{id:'2', name:'Группа 2'},
	{id:'3', name:'Группа 3'},
	{id:'4', name:'Группа 4'},
	{id:'5', name:'Группа 5'},
	{id:'6', name:'Группа 6'},
	{id:'7', name:'Группа 7'},
	{id:'8', name:'Группа 8'},
	{id:'9', name:'Группа 9'},
	{id:'10', name:'Группа 10'},
	{id:'11', name:'Группа 11'},
	{id:'12', name:'Группа 12'},
]

class Members extends Component {  
	state = {
		height: '0',
	}
	
	componentDidMount() {
		const { setPanel, history, location, setBreadcrumbs, queryData } = this.props
		const { id } = this.props.match.params
				
		const panel = panelList()		
		panel[0].link += `/${id}`
		
		setPanel(panel)
		
		const breadcrumbs = Breadcrumbs()		
		breadcrumbs[1].link += `/${id}`
		breadcrumbs[1].label = queryData.name
		
		setBreadcrumbs(breadcrumbs)
	}	
	
	selectGroup = (groupId, groupName) => {
		const { id } = this.props.match.params
		const { setPanel, setBreadcrumbs, queryData } = this.props
		
		const panel = panelGroupSelected()		
		panel[1].link += `?id=${id}&groupId=${groupId}`
		panel[2].link += `?id=${id}&groupId=${groupId}`
		
		setPanel(panel)
		
		const breadcrumbs = Breadcrumbs()		
		breadcrumbs[1].link += `/${id}`
		breadcrumbs[1].label = queryData.name
		breadcrumbs.push({
			type	: 'label',
			label	:	groupName,
		})
		setBreadcrumbs(breadcrumbs)
	}
	
	selectItem = (groupId, itemId) => {
		const { id } = this.props.match.params
		const { setPanel } = this.props
		
		const panel = panelItemSelected()		
		panel[1].link += `?id=${id}&groupId=${groupId}`
		panel[2].link += `?id=${id}&groupId=${groupId}`
		panel[3].link += `?id=${id}&groupId=${groupId}&itemId=${itemId}`
		
		setPanel(panel)
	}
	
	render() {
		const { classes, queryData, height } = this.props
		
		const listStyle = { height, overflow: 'auto' }
		
		return (
			<Grid container alignItems="stretch">
				<Grid item xs={3}>
					<div style={listStyle}>
						<List component="nav"  className={classes.groupsList}>
							{groups.map((el, idx) => (
								<div key={idx} onClick={() => this.selectGroup(el.id, el.name)}>
									<ListItem button>
										<ListItemText primary={el.name} />
									</ListItem>
									<Divider />
								</div>
							))}
						</List>
					</div>
				</Grid>
				<Grid item xs={9}>
					<div style={listStyle}>
						table
					</div>
				</Grid>
			</Grid>
		)
	}	
}

const ViewGraphQLProps = {
	query			: FETCH_REGION_GROUPS,
	dataName	: 'regionGroups',
}

export default ViewGraphQL(ViewGraphQLProps)(
	withStyles(styles)(
		withRouter(Members)
	)
)