import React, { FunctionComponent } from 'react'
import { withRouter } from 'react-router-dom'

import DeleteGraphQL from '../../../common/hoc/DeleteGraphQL'
import { MUTATE_DELETE_GROUP } from '../../../../database/mutations'
import { QUERY_GROUPS, QUERY_GROUP } from '../../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
		button	: object,
		title		: object,
	},
	onDelete	: () => any,
	groupId		: string,
	queryData	: any,
	action		: (args: { variables: { id: string }}) => any,
}

const DeleteGroup: FunctionComponent<ComponentProps> = (props) => {

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

const DeleteGroupGQL =  (
	DeleteGraphQL(
		withStyles(styles)(
			DeleteGroup
		)
	)
)

interface CoverProps {
	regionId: string,
	groupId	: string,
}

const DeleteGroupCover: FunctionComponent<CoverProps> = (props) => {

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

	return <DeleteGroupGQL {...props} queryProps={queryProps} />
}

export default withRouter(DeleteGroupCover)
