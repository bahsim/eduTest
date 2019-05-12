import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import AddIcon 			  from '@material-ui/icons/Add'
import PageviewIcon   from '@material-ui/icons/Pageview'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'

import SimpleList from '../../../../../components/common/SimpleList.tsx'

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
  baseURL       : string,
  children      : any,
  labelName     : string,
  labelListName : string,
  listMode      : string,
  history: {
		replace			: (url: string) => any
	},
	setPanel			: (PanelArray) => any,
	setBreadcrumbs: (BreadcrumbsArray) => any,
  queryList     : any,
}

const ViewList = (props: ComponentProps) => {

  const queryProps = { query: props.queryList, queryParams: {}}

  const onClick = (itemId, itemName) => {
    props.setBreadcrumbs([ props.labelName, itemName ])
    props.setPanel([
      panelLink(`${props.baseURL}/new`, AddIcon, 'Добавить'),
      panelLink(`${props.baseURL}/items/${itemId}`, PageviewIcon, 'Открыть')
    ])
  }

  const onDoubleClick = (itemId, itemName) => {
    props.history.replace(`${props.baseURL}/items/${itemId}`)
  }

  useEffect(() => {
    props.setBreadcrumbs([ props.labelName ])
    props.setPanel([ panelLink(`${props.baseURL}/new`, AddIcon, 'Добавить') ])
  }, [])

  return(
    React.Children.map(props.children, child => (
      React.cloneElement(child, { onClick, onDoubleClick })
    ))
  )
}

export default withRouter(ViewList)
