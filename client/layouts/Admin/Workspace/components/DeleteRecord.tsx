import React, { useEffect } from 'react'
import { withRouter } 			from 'react-router-dom'

import DeleteGraphQL from '../../../../database/components/DeleteGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Typography 		from '@material-ui/core/Typography'
import Button 				from '@material-ui/core/Button'
import ArrowBackIcon 	from '@material-ui/icons/ArrowBack'

const styles = theme => ({
	button: {
    margin			: theme.spacing.unit,
  },
	title: {
    margin			: theme.spacing.unit,
		marginBottom: theme.spacing.unit*3,
	},
})

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const BREADCRUMBS_DEL_TEST = 'Удаление'

const LABEL_DELETE 	= 'Удалить'

interface ComponentProps {
	linkBack    	: string,
	breadcrumbs 	: string,
	classes: {
    button	: object
    title   : object
  },
  setPanel      : (PanelArray) => any
  setBreadcrumbs: (BreadcrumbsArray) => any
  queryProps    : {
    queryParams : {
      id  : string
    }
  },
  queryData     : any,
  history       : { replace: (url: string) => any}
  action        : (args: { variables: { id: string }}) => any
}

const DeleteTest = (props) => (
	<DeleteGraphQL queryProps={props.queryProps}>
		<Component {...props} />
	</DeleteGraphQL>
)

const Component = (props: ComponentProps) => {

	const handleSubmit = (e) => {
		e.preventDefault()

		props.action({ variables: { id: props.queryProps.queryParams.id } })
			.then(() => props.history.replace(props.linkBack))
	}

	useEffect(() => {
		const panel = [panelLink(props.linkBack, ArrowBackIcon, 'Назад')]
		panel[0].link += `/${props.queryProps.queryParams.id}`
		props.setPanel(panel)

		props.setBreadcrumbs([
			props.breadcrumbs,
			props.queryData.name,
			BREADCRUMBS_DEL_TEST
		])
	}, [])

	return (
		<div>
			<Typography  variant="h6" color="inherit" className={props.classes.title}>
				{props.queryData.name}
			</Typography>
			<Button
				type="submit"
				variant="contained"
				color="secondary"
				className={props.classes.button}
				onClick={handleSubmit}
			>
				{LABEL_DELETE}
			</Button>
		</div>
	)
}

export default withStyles(styles)(withRouter(DeleteTest))
