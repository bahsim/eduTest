import React, { useState, useEffect } from 'react';
import { withRouter } 			from 'react-router-dom'

import AddIcon 			from '@material-ui/icons/Add'
import PageviewIcon from '@material-ui/icons/Pageview'

import TestsList from '../../../components/TestsList.tsx'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_ADD 	= panelLink('/admin/tests/new', AddIcon, 'Добавить')
const PANEL_OPEN 	= panelLink('/admin/tests', PageviewIcon, 'Открыть')

const BREADCRUMBS_TESTS	= 'Тесты'

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

const Tests = (props: ComponentProps) => {

	const [ currentItem, setCurrentItem ] = useState('')

	useEffect(() => {
    props.setPanel([{...PANEL_ADD}])
		props.setBreadcrumbs([BREADCRUMBS_TESTS])
	}, [])

	const selectItem = (id) => {
		const panel = [ {...PANEL_ADD}, {...PANEL_OPEN} ]
		panel[1].link += `/${id}`
		props.setPanel(panel)

		setCurrentItem(id)
	}

	const openItem = (id) => {
		props.history.replace(`/admin/tests/${id}`)
	}

	return (
		<TestsList
			label={LABEL_NAME}
			selectedItem={currentItem}
			onClick={selectItem}
			onDoubleClick={openItem}
		/>
	)
}

export default withRouter(Tests)
