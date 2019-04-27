import React, { Component } from 'react';
import axios from 'axios'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'

const panelList = () => ([
	{
		link	: '/admin/regions/members/groups/new',
		icon	: AddIcon,
		label	:	'Добавить группу',
	},
])

const panelGroupSelected = () => ([
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

class EditRegion extends Component {  
	state = {}
	
	componentDidMount() {
		const { setPanel, history, location } = this.props
		const { id } = queryString.parse(location.search)
		
		if (!id) history.replace('/admin/regions')
		
		setPanel(panelList())
	}	
	
	selectGroup = (regionId, groupId) => {
		const { setPanel } = this.props
		
		const panel = panelGroupSelected()		
		panel[1].link += `?id=${regionId}&groupId=${groupId}`
		panel[2].link += `?id=${regionId}&groupId=${groupId}`
		
		setPanel(panel)
	}
	
	selectItem = (regionId, groupId, itemId) => {
		const { setPanel } = this.props
		
		const panel = panelItemSelected()		
		panel[1].link += `?id=${regionId}&groupId=${groupId}`
		panel[2].link += `?id=${regionId}&groupId=${groupId}`
		panel[3].link += `?id=${regionId}&groupId=${groupId}&itemId=${itemId}`
		
		setPanel(panel)
	}
	
	render() {
		return (
			<div>
				<div onClick={() => this.selectGroup('regionId', 'groupId')}>
					Group
				</div>
				<br/>
				<div onClick={() => this.selectItem('regionId', 'groupId', 'itemId')}>
					Item
				</div>
			</div>
		);
	}	
}

export default withRouter(EditRegion)