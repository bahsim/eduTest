import React 					from 'react'
import { withRouter } from 'react-router-dom'

import Grid        		from '@material-ui/core/Grid'
import ArrowBackIcon 	from '@material-ui/icons/ArrowBack'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const BREADCRUMBS_DEL_TEST = 'Удаление'

interface ComponentProps {
	baseURL       : string,
  itemId        : string,
  labelName     : string,
	children			: any,
	breadcrumbs 	: string,
  setPanel      : (PanelArray) => any
  setBreadcrumbs: (BreadcrumbsArray) => any
  queryData     : any,
  history       : { replace: (url: string) => any}
  action        : (args: { variables: { id: string }}) => any
}

const DeleteItem = (props: ComponentProps) => {

  const takeUpName = (name) => {
		const panel = [panelLink(props.baseURL, ArrowBackIcon, 'Назад')]
		panel[0].link += `/${props.itemId}`
		props.setPanel(panel)

		props.setBreadcrumbs([ props.labelName, name, BREADCRUMBS_DEL_TEST ])
	}

	const onDelete = () => {
		props.history.replace(props.baseURL)
	}

	return (
		<Grid container >
			<Grid item xs={6}>
        {React.Children.map(props.children, child => (
          React.cloneElement(child, { onDelete, takeUpName })
        ))}
			</Grid>
		</Grid>
	)
}

export default withRouter(DeleteItem)
