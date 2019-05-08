import React from 'react'

import DeleteGraphQL from '../../../database/components/DeleteGraphQL'
import { MUTATE_DELETE_GROUP } from '../../../database/mutations'
import { QUERY_GROUPS, QUERY_GROUP } from '../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import Typography 		from '@material-ui/core/Typography'
import Button 				from '@material-ui/core/Button'

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
		button	: object
		title		: object
	},
	onDelete	: () => any
	groupId		: string
	queryData	: any
	action		: (args: { variables: { id: string }}) => any
}

const DeleteGroup = (props) => {
	const queryProps = {
		query			: QUERY_GROUP,
		mutation	: MUTATE_DELETE_GROUP,
		update		: QUERY_GROUPS,
		queryParams: {
			id : props.groupId
		},
		updateParams: {
			regionId: props.regionId
		},
	}
	return (
		<DeleteGraphQL queryProps={queryProps}>
			<Component {...props} />
		</DeleteGraphQL>
	)
}

const Component = (props: ComponentProps) => {

	const handleSubmit = (e) => {
		e.preventDefault()

		props.action({ variables: { id: props.groupId } })
			.then(() => props.onDelete())
	}

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

export default withStyles(styles)(DeleteGroup)
