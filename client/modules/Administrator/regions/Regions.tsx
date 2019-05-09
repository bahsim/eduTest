import React, { useState, useEffect } from 'react';
import { withRouter } 			from 'react-router-dom'

import AddIcon 			from '@material-ui/icons/Add'
import PageviewIcon from '@material-ui/icons/Pageview'

import RegionsList from '../../../components/RegionsList.tsx'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_ADD 	= panelLink('/admin/regions/new', AddIcon, 'Добавить')
const PANEL_OPEN 	= panelLink('/admin/regions', PageviewIcon, 'Открыть')

const BREADCRUMBS_REGIONS	= 'Регионы'

const LABEL_NAME = 'Наименование'

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: any, icon: any, label: any };
}

interface BreadcrumbsArray {
  length: number;
  [item: number]: string
}

interface ComponentProps {
	history: {
		replace			: (url: string) => any
	},
	setPanel			: (PanelArray) => any,
	setBreadcrumbs: (BreadcrumbsArray) => any
}

const Regions = (props: ComponentProps) => {

	const [ currentItem, setCurrentItem ] = useState('')

	useEffect(() => {
    props.setPanel([{...PANEL_ADD}])
		props.setBreadcrumbs([BREADCRUMBS_REGIONS])
	}, [])

	const selectItem = (id) => {
		const panel = [ {...PANEL_ADD}, {...PANEL_OPEN} ]
		panel[1].link += `/${id}`
		props.setPanel(panel)

		setCurrentItem(id)
	}

	const openItem = (id) => {
		props.history.replace(`/admin/regions/${id}`)
	}

	return (
		<RegionsList
			label={LABEL_NAME}
			selectedItem={currentItem}
			onClick={selectItem}
			onDoubleClick={openItem}
		/>
	)
}

export default withRouter(Regions)
