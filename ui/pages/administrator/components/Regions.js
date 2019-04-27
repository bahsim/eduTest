import React, { Component } from 'react';
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import PeopleIcon from '@material-ui/icons/People'

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
		
		fetch('/api/admin/regions')
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				// console.log(value)
			})
			.catch((error) => {
				console.log(error)
			})
	}	
	
	selectItem = (id) => {
		const { setPanel } = this.props
		
		const panel = panelListSelected()		
		panel[1].link += `?id=${id}`
		panel[2].link += `?id=${id}`
		
		setPanel(panel)
	}
	
	render() {
		return (
			<div onClick={() => this.selectItem('id')}>
				Regions
			</div>
		)
	}	
}

export default Regions