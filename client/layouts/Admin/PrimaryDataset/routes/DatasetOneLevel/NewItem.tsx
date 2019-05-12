import React, { useEffect } from 'react'
import { withRouter }       from 'react-router-dom'

import Grid           from '@material-ui/core/Grid'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const LABEL_BACK 	= 'Назад'

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: any, icon: any, label: any };
}
interface BreadcrumbsArray {
  length: number;
  [item: number]: string
}

interface BaseComponentProps {
  baseURL       : string,
  children      : any,
  labelName     : string,
  labelNew      : string,
  breadcrumbs   : BreadcrumbsArray,
  setBreadcrumbs: (BreadcrumbsArray) => any
  setPanel      : (PanelArray) => any
  history       : { replace: (url: string) => any }
}

const NewItem = (props: BaseComponentProps) => {

  useEffect(() => {
		props.setPanel([panelLink(props.baseURL, ArrowBackIcon, LABEL_BACK)])
    props.setBreadcrumbs([ props.labelName, props.labelNew ])
  }, [])

  const onSave = () => {
    props.history.replace(props.baseURL)
	}

	return (
		<Grid container>
			<Grid item xs={6}>
        {React.Children.map(props.children, child => (
          React.cloneElement(child, { onSave })
        ))}
			</Grid>
		</Grid>
	)
}

export default withRouter(NewItem)
