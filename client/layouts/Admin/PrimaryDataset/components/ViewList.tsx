import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import AddIcon 			  from '@material-ui/icons/Add'
import PageviewIcon   from '@material-ui/icons/Pageview'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'

import SimpleList from '../../../../components/common/SimpleList.tsx'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: any, icon: any, label: any };
}

interface BreadcrumbsArray {
  length: number;
  [item: number]: string
}

interface ComponentProps {
  rootLink      : string,
  level         : number,
  linkOpen1     : string,
  linkOpen2     : string,
  breadcrumbs   : string,
  labelListName : string,
  listMode      : string,
  history: {
		replace			: (url: string) => any
	},
  match         : any,
	setPanel			: (PanelArray) => any,
	setBreadcrumbs: (BreadcrumbsArray) => any,
  queryProps    : any,
}

const ViewList = (props: ComponentProps) => {

	const [ currentItem, setCurrentItem ] = useState('')

	useEffect(() => {
    let panel = []

    if (props.level > 1) {
      let link = `${props.rootLink}`
      if (props.level === 3) {
        const { parentId } = props.queryProps.queryParams
        link += `/parent/${parentId}/groups`
      }
      panel.push(panelLink(link, ArrowBackIcon, 'Назад'))
    }

    if (props.listMode === 'edit') {
      panel.push(panelLink(`${props.rootLink}/new`, AddIcon, 'Добавить'))
    }

    props.setPanel(panel)
    props.setBreadcrumbs([props.breadcrumbs])
	}, [])

	const selectItem = (id) => {
    if (props.listMode === 'edit') {
      let panel = []

      if (props.level > 1) {
        let link = `${props.rootLink}`
        if (props.level === 3) {
          const { parentId } = props.queryProps.queryParams
          link += `/parent/${parentId}/groups`
        }
        panel.push(panelLink(link, ArrowBackIcon, 'Назад'))
      }

      panel.push(panelLink(`${props.match.url}/new`, AddIcon, 'Добавить'))
      panel.push(panelLink(`${props.match.url}/${id}`, PageviewIcon, 'Открыть'))

      props.setPanel(panel)
      setCurrentItem(id)
    } else if (props.listMode === 'select') {

      let link = (props.level === 1 ?
        `${props.rootLink}/parent/${id}/groups`
      :
        `${props.match.url}/${id}/items`
      )

      props.history.replace(link)
    }
	}

	const openItem = (id) => {
		props.history.replace(`${props.rootLink}/${id}`)
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

export default withRouter(ViewList)
