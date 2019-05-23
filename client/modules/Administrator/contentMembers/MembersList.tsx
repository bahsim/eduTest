import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Divider      	from '@material-ui/core/Divider'
import Typography     from '@material-ui/core/Typography'

import Button 				from '@material-ui/core/Button'
import AddIcon 			  from '@material-ui/icons/Add'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import EditIcon       from '@material-ui/icons/Edit'
import DeleteIcon     from '@material-ui/icons/DeleteForever'

import SimpleList 		from '../../../components/SimpleList.tsx'
import NewRecord			from '../../../components/NewRecord.tsx'
import EditRecord			from '../../../components/EditRecord.tsx'
import DeleteRecord		from '../../../components/DeleteRecord.tsx'

const styles = theme => ({
	title: {
		marginTop		: theme.spacing.unit*2
	},
	button: {
		margin      : theme.spacing.unit/2,
		marginRight : theme.spacing.unit*2,
	},
  icon: {
		marginRight : theme.spacing.unit,
	}
})

const LABEL_ADD 				= 'Добавить'
const LABEL_EDIT 				= 'Изменить'
const LABEL_DELETE 			= 'Удалить'
const LABEL_CANCEL 			= 'Отмена'
const LABEL_NEW_RECORD 	= 'Новая запись'
const LABEL_EDIT_RECORD = 'Изменение записи'

const MODE_REGISTRY 		= 'MODE_REGISTRY'
const MODE_NEW_ITEM 		= 'MODE_NEW_ITEM'
const MODE_EDIT_ITEM 		= 'MODE_EDIT_ITEM'
const MODE_DELETE_ITEM 	= 'MODE_DELETE_ITEM'

interface ComponentProps {
	classes: {
		title				: object,
		button			: object,
		icon				: object,
	},
	data: {
		ownerId			: string,
		regionId		: string,
	},
	queryList			: any,
	queryItem			: any,
	mutateAdd			: any,
	mutateEdit		: any,
	mutateDelete	: any,
	labelListName	: any,
	scrollTop			: number,
	roofTop				: number,
}

interface ComponentState {
	mode		: string,
	itemId	: string,
}

class MembersList extends Component<ComponentProps,ComponentState> {

	state = {
		mode		: MODE_REGISTRY,
		itemId	: '',
	}

	buttonsRef

	render() {

		if (!this.props.data.ownerId) return null

		const { mode, itemId } = this.state
		const { classes } = this.props

		const componentRegistry = (
			<SimpleList
				queryProps = {{
					query       : this.props.queryList,
					queryParams : { groupId	: this.props.data.ownerId },
				}}
				onClick				= {(item)	=> this.setState({ itemId: item.id})}
				onDoubleClick = {() 		=> this.setState({ mode: MODE_EDIT_ITEM})}
				extraAction 	= {() 		=> {}}
				current 			= {itemId}
				label 				= {this.props.labelListName}
			/>
		)

		const componentNewRecord = (
			<NewRecord
				queryProps = {{
					mutation    		: this.props.mutateAdd,
					mutationParams	: {
						regionId			: this.props.data.regionId,
						groupId				: this.props.data.ownerId,
					},
					update      		: this.props.queryList,
					updateParams		: { groupId : this.props.data.ownerId },
				}}
				onClick = {(item) => {
					this.setState({ mode: MODE_REGISTRY, itemId: item.id })
				}}
				extraAction = {() => {}}
			/>
		)

		const componentEditRecord = (
			<EditRecord
				queryProps = {{
					query			    : this.props.queryItem,
					mutation      : this.props.mutateEdit,
					queryParams   : { id: this.state.itemId },
					update        : this.props.queryList,
					updateParams	: { groupId : this.props.data.ownerId },
				}}
				onClick = {(item) => {
					this.setState({ mode: MODE_REGISTRY, itemId: item.id })
				}}
				extraAction = {() => {}}
			/>
		)

		const componentDeleteRecord = (
			<DeleteRecord
				queryProps = {{
					query			    : this.props.queryItem,
					mutation      : this.props.mutateDelete,
					queryParams   : { id: this.state.itemId },
					update		    : this.props.queryList,
					updateParams	: { groupId : this.props.data.ownerId },
				}}
				onClick = {(item) => {
					this.setState({ mode: MODE_REGISTRY, itemId: '' })
				}}
				extraAction = {() => {}}
			/>
		)

		const isVisible = () => {
			if (!this.buttonsRef) return true

			const { scrollTop, roofTop } = this.props
			const { top } = this.buttonsRef.getBoundingClientRect()

			return top - roofTop >= 0 ? true : false
		}

		const panelButton = (Icon, label, mode, props) => (
			<Button {...props}
				className	= {classes.button}
				onClick		= {() => this.setState({ mode })}
			>
				<Icon className={classes.icon}/>
				{label}
			</Button>
		)

		const panelButtonsSet = (props) => (
			<Fragment>
				{mode === MODE_REGISTRY ?
					<Fragment>
						{panelButton(AddIcon, LABEL_ADD, MODE_NEW_ITEM, props)}
						{itemId !== '' &&
							<Fragment>
								{panelButton(EditIcon, LABEL_EDIT, MODE_EDIT_ITEM, props)}
								{panelButton(DeleteIcon, LABEL_DELETE, MODE_DELETE_ITEM, props)}
							</Fragment>
						}
					</Fragment>
				:
					panelButton(ArrowBackIcon, LABEL_CANCEL, MODE_REGISTRY, props)
				}
			</Fragment>
		)

		const panelStyle = {
			margin: 0,
	    top: this.props.roofTop,
	    right: 'auto',
	    bottom: 'auto',
	    left: 20,
	    position: 'fixed',
		}

		return (
			<Fragment>
				<Divider/>
				<div ref={(el) => this.buttonsRef = el}>
					{panelButtonsSet({})}
				</div>
				{!isVisible() &&
					<div style={panelStyle}>
						{panelButtonsSet({variant:'contained', color:'primary'})}
					</div>
				}
				{mode === MODE_REGISTRY &&
					<Fragment>
						<Divider/>
						{componentRegistry}
					</Fragment>
				}
				{mode === MODE_NEW_ITEM &&
					<Fragment>
						<Divider/>
						<Typography variant="h6" color="inherit" className={classes.title}>
							{LABEL_NEW_RECORD}
						</Typography>
						{componentNewRecord}
					</Fragment>
				}
				{mode === MODE_EDIT_ITEM &&
					<Fragment>
						<Divider/>
						<Typography variant="h6" color="inherit" className={classes.title}>
							{LABEL_EDIT_RECORD}
						</Typography>
						{componentEditRecord}
					</Fragment>
				}
				{mode === MODE_DELETE_ITEM &&
					<Fragment>
						<Divider/>
						{componentDeleteRecord}
					</Fragment>
				}
			</Fragment>
		)
	}
}

export default withStyles(styles)(MembersList)
