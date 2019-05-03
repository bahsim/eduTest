import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'

import RegionsList from '../../../common/components/RegionsList'

const styles = theme => ({
	groupsList: {
		overflow: 'auto',
	}
})

const panelRegionSelected = () => ([
	{
		link	: '/admin/members',
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

const BreadcrumbsInit = () => ([
	{
		type	: 'label',
		label	:	'Участники',
	},
])
const BreadcrumbsRegion = () => ([
	{
		type	: 'label',
		label	:	'Участники',
	},
	{
		type	: 'label',
		label	:	'Регион',
	},
])

class Members extends Component {  
	state = {
		regionId: '',
	}
	
	componentDidMount() {
		const { setPanel, setBreadcrumbs } = this.props
				
		setPanel([])
		setBreadcrumbs(BreadcrumbsInit())
	}	
	
	selectRegion = (regionId, regionName) => {
		const { setPanel, setBreadcrumbs } = this.props
		
		this.setState({regionId})
		
		const breadcrumbs = BreadcrumbsRegion()
		breadcrumbs[1].label = regionName
		setBreadcrumbs(breadcrumbs)
		
		const panel = panelRegionSelected()
		panel[0].link += `/${regionId}/groups/new`
		setPanel(panel)
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
		const { regionId } = this.state
		
		const listStyle = { height, overflow: 'auto' }
		
		return (
			<Grid container alignItems="stretch">
				<Grid item xs={3}>
					<div style={listStyle}>
						<RegionsList
							label="Регион"
							selectedItem={regionId} 
							onClick={this.selectRegion} 
							onDoubleClick={() => {}}
						/>
					</div>
				</Grid>
				<Grid item xs={3}>
					<div style={listStyle}>
						groups
					</div>
				</Grid>
				<Grid item xs={6}>
					<div style={listStyle}>
						items
					</div>
				</Grid>
			</Grid>
		)
	}	
}

export default withStyles(styles)(
	withRouter(Members)
)
	