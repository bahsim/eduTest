import React, { Fragment, useEffect } from 'react'

import DeleteGraphQL 	from '../../database/components/DeleteGraphQL'

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

const LABEL_DELETE 	= 'Удалить'

interface ComponentProps {
	classes: {
    button		: object
    title   	: object
  },
	onClick			: () => any,
  extraAction	: (id: string, name: string) => any,
  queryData		: any,
  action   		: (args: { variables: { id: string }}) => any
}

const DeleteRecord = (props) => (
	<DeleteGraphQL queryProps={props.queryProps}>
		<Component {...props} />
	</DeleteGraphQL>
)

const Component = (props: ComponentProps) => {

	const handleSubmit = (e) => {
		props.action({ variables: { id: props.queryData.id } })
			.then(() => props.onClick()	)
	}

	useEffect(() => {
    props.extraAction(props.queryData.id, props.queryData.name)
  }, [])

	return (
		<Fragment>
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
		</Fragment>
	)
}

export default withStyles(styles)(DeleteRecord)
