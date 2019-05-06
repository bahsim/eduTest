import React, { FunctionComponent } from 'react'
import { withRouter } from 'react-router-dom'

import DeleteGraphQL from '../../../common/hoc/DeleteGraphQL'
import { MUTATE_DELETE_MEMBER } from '../../../../database/mutations'
import { QUERY_MEMBERS, QUERY_MEMBER } from '../../../../database/queries'

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
	memberId	: string,
	queryData	: any,
	action		: (args: { variables: { id: string }}) => any,
}

const DeleteMember: FunctionComponent<ComponentProps> = (props) => {

	const handleSubmit = (e) => {
		e.preventDefault()

		props.action({ variables: { id: props.memberId }})
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

const DeleteMemberGQL =  (
	DeleteGraphQL(
		withStyles(styles)(
			DeleteMember
		)
	)
)

interface CoverProps {
	groupId	: string,
	memberId: string,
}

const DeleteMemberCover: FunctionComponent<CoverProps> = (props) => {

	const queryProps = {
		query: QUERY_MEMBER,
		mutation	: MUTATE_DELETE_MEMBER,
		update		: QUERY_MEMBERS,
		queryParams: {
			id	: props.memberId
		},
		updateParams: {
			groupId	: props.groupId
		},
	}

	return <DeleteMemberGQL {...props} queryProps={queryProps} />
}

export default withRouter(DeleteMemberCover)
