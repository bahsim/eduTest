import React, { useState, useEffect } from 'react';
import { withRouter } 			from 'react-router-dom'

import AddIcon 			from '@material-ui/icons/Add'
import PageviewIcon from '@material-ui/icons/Pageview'

import SimpleList from '../../../../components/common/SimpleList.tsx'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_ADD 	= panelLink('/admin/tests/new', AddIcon, 'Добавить')
const PANEL_OPEN 	= panelLink('/admin/tests', PageviewIcon, 'Открыть')

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: any, icon: any, label: any };
}

interface BreadcrumbsArray {
  length: number;
  [item: number]: string
}

interface ComponentProps {
  linkBack      : string,
  breadcrumbs   : string,
  labelListName : string,
  history: {
		replace			: (url: string) => any
	},
	setPanel			: (PanelArray) => any,
	setBreadcrumbs: (BreadcrumbsArray) => any,
  queryProps    : any,
}

const ViewList = (props: ComponentProps) => {

	const [ currentItem, setCurrentItem ] = useState('')

	useEffect(() => {
    props.setPanel([panelLink(`${props.linkBack}/new`, AddIcon, 'Добавить')])
		props.setBreadcrumbs([props.breadcrumbs])
	}, [])

	const selectItem = (id) => {
		const panel = [
      panelLink(`${props.linkBack}/new`, AddIcon, 'Добавить'),
      panelLink(props.linkBack, PageviewIcon, 'Открыть')
    ]
		panel[1].link += `/${id}`
		props.setPanel(panel)

		setCurrentItem(id)
	}

	const openItem = (id) => {
		props.history.replace(`${props.linkBack}/${id}`)
	}

	return (
		<SimpleList
      queryProps={props.queryProps}
      label={props.labelListName}
			selectedItem={currentItem}
			onClick={selectItem}
			onDoubleClick={openItem}
		/>
	)
}

export default ViewList
