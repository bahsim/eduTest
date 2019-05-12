import React, { useEffect } from 'react'

import Grid               from '@material-ui/core/Grid'
import ArrowBackIcon      from '@material-ui/icons/ArrowBack'
import DeleteForeverIcon  from '@material-ui/icons/DeleteForever'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const LABEL_NEW_NAME 	= 'Новое наименование'
const LABEL_SAVE 			= 'Сохранить'
const LABEL_CLOSE 		= 'Закрыть'
const LABEL_BACK      = 'Назад'
const LABEL_DELETE    = 'Удалить'

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: string, icon: any, label: string }
}

interface BreadcrumbsArray {
  length: number;
  [item: number]: string;
}

interface ComponentProps {
  baseURL       : string,
  itemId        : string,
  labelName     : string,
  breadcrumbs   : BreadcrumbsArray,
  children      : any,
  setPanel      : (PanelArray) => any
  setBreadcrumbs: (BreadcrumbsArray) => any
  action        : (args: { variables: { id: string, name: string }}) => any
}

const ViewItem = (props: ComponentProps) => {

  useEffect(() => {
    const panel = [
			panelLink(props.baseURL, ArrowBackIcon, LABEL_BACK),
			panelLink(props.baseURL, DeleteForeverIcon, LABEL_DELETE)
		]
		panel[1].link += `/items/${props.itemId}/delete`
		props.setPanel(panel)
  }, [])

	const setBreadcrumbs = (name) => {
		props.setBreadcrumbs([ props.labelName, name ])
	}

  const onSave = (id, name) => setBreadcrumbs(name)

  const takeUpName = (name) => setBreadcrumbs(name)

  return (
		<Grid container >
			<Grid item xs={6}>
        {React.Children.map(props.children, child => (
          React.cloneElement(child, { onSave, takeUpName })
        ))}
			</Grid>
		</Grid>
	)
}

export default ViewItem
