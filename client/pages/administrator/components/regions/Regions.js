import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add'
import PageviewIcon from '@material-ui/icons/Pageview'

import RegionsList from '../../../common/components/RegionsList'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_ADD 	= panelLink('/admin/regions/new', AddIcon, 'Добавить')
const PANEL_OPEN 	= panelLink('/admin/regions', PageviewIcon, 'Открыть')

const BREADCRUMBS_REGIONS	= 'Регионы'

const LABEL_NAME = 'Наименование'

class Regions extends Component {
	state = {
		currentItem: '',
	}

	componentDidMount() {
		const { setPanel, setBreadcrumbs } = this.props

		setPanel([{...PANEL_ADD}])
		setBreadcrumbs([BREADCRUMBS_REGIONS])
	}

	selectItem = (id) => {
		const { setPanel } = this.props

		const panel = [
			{...PANEL_ADD},
			{...PANEL_OPEN}
		]
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
				label={LABEL_NAME}
				selectedItem={currentItem}
				onClick={this.selectItem}
				onDoubleClick={this.openItem}
			/>
		)
	}
}

export default withRouter(Regions)
