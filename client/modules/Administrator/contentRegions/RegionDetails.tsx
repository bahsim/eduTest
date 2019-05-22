import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Divider      	from '@material-ui/core/Divider'
import Button 				from '@material-ui/core/Button'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import EditIcon       from '@material-ui/icons/Edit'

import ViewRegionDetails from './ViewRegionDetails.tsx'
import EditRegionDetails from './EditRegionDetails.tsx'

const styles = theme => ({
	button: {
		margin      : theme.spacing.unit/2,
		marginRight : theme.spacing.unit*2,
	},
  icon: {
		marginRight : theme.spacing.unit,
	},
})

const LABEL_CHANGE = 'Изменить'
const LABEL_CANCEL = 'Отмена'

const MODE_VIEW = 'MODE_VIEW'
const MODE_EDIT = 'MODE_EDIT'

interface ComponentProps {
	classes: {
		button	: object,
		icon		: object,
	},
	queryList	: any,
	queryItem	: any,
	mutateEdit: any,
	data: {
		ownerId	: string,
	},
}

interface ComponentState {
	mode: string,
}

class RegionDetails extends Component<ComponentProps,ComponentState> {

	state = {
		mode: MODE_VIEW,
	}

	render() {
		if (!this.props.data.ownerId) return null

		const { mode } = this.state

		const panelButton = (Icon, label, mode) => (
			<Button
				className	= {this.props.classes.button}
				onClick		= {() => this.setState({ mode })}
			>
				<Icon className={this.props.classes.icon}/>
				{label}
			</Button>
		)

		const componentViewRecord = (
			<ViewRegionDetails
				queryProps = {{
					query			    : this.props.queryItem,
					queryParams   : { id: this.props.data.ownerId },
				}}
			/>
		)

		const componentEditRecord = (
			<EditRegionDetails
				queryProps = {{
					query			    : this.props.queryItem,
					mutation      : this.props.mutateEdit,
					queryParams   : { id: this.props.data.ownerId },
					update        : this.props.queryList,
					updateParams  : {},
				}}
				onClick={() => this.setState({ mode: MODE_VIEW })}
			/>
		)

		return (
			<Fragment>
				<Divider />
				{mode === MODE_VIEW &&
					<Fragment>
						{panelButton(EditIcon, LABEL_CHANGE, MODE_EDIT)}
						<Divider />
						{componentViewRecord}
					</Fragment>
				}
				{mode === MODE_EDIT &&
					<Fragment>
						{panelButton(ArrowBackIcon, LABEL_CANCEL, MODE_VIEW)}
						<Divider />
						{componentEditRecord}
					</Fragment>
				}
			</Fragment>
		)
	}
}

export default withStyles(styles)(RegionDetails)
