import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add'
import PageviewIcon from '@material-ui/icons/Pageview'

import RegionsList from '../../../common/components/RegionsList'

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
			<RegionsList
				label="Наименование"
				selectedItem={currentItem} 
				onClick={this.selectItem} 
				onDoubleClick={this.openItem}
			/>
		)
	}	
}

export default withRouter(Regions)
