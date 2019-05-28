import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Divider      	from '@material-ui/core/Divider'
import Typography     from '@material-ui/core/Typography'

import Button 				from '@material-ui/core/Button'
import AddIcon 			  from '@material-ui/icons/Add'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import EditIcon       from '@material-ui/icons/Edit'
import DeleteIcon     from '@material-ui/icons/DeleteForever'

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

const MODE_NEW_ITEM 		= 'MODE_NEW_ITEM'
const MODE_EDIT_ITEM 		= 'MODE_EDIT_ITEM'
const MODE_DELETE_ITEM 	= 'MODE_DELETE_ITEM'

interface ComponentProps {
	classes: {
		title			: object,
		button		: object,
		icon			: object,
	},
	scrollTop		: number,
	roofTop			: number,
	roofLeft		: number,
	registry		: any,
	newItem			: any,
	editItem		: any,
	deleteItem	: any,
	setState		: (state: any) => any,
	state				: any,
}

class ContentList extends Component<ComponentProps,{}> {

	buttonsRef

	render() {
		const { mode, itemId } = this.props.state
		const { classes } = this.props

		const isVisible = () => {
			if (!this.buttonsRef) return true

			const { scrollTop, roofTop } = this.props
			const { top } = this.buttonsRef.getBoundingClientRect()

			return top - roofTop >= 0 ? true : false
		}

		const panelButton = (Icon, label, mode, props) => (
			<Button {...props}
				className	= {classes.button}
				onClick		= {() => this.props.setState({ mode })}
			>
				<Icon className={classes.icon}/>
				{label}
			</Button>
		)

		const panelButtonsSet = (props) => (
			<Fragment>
				{mode === '' ?
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
					panelButton(ArrowBackIcon, LABEL_CANCEL, '', props)
				}
			</Fragment>
		)

		const panelStyle = {
			margin	: 0,
	    top			: this.props.roofTop + 20,
	    right		: 'auto',
	    bottom	: 'auto',
	    left		: this.props.roofLeft + 20,
	    position: 'fixed',
			zIndex	: 1001,
		}

		const { registry, newItem, editItem, deleteItem } = this.props

		const { component: Registry,		...resitryProps }			= registry
		const { component: NewItem, 		...newItemProps } 		= newItem
		const { component: EditItem, 		...editItemProps } 		= editItem
		const { component: DeleteItem, 	...deleteItemProps } 	= deleteItem

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
				<Divider/>

				{mode === '' &&
					<Registry
						onClick				= {(item)	=> this.props.setState({ itemId: item.id})}
						extraAction 	= {() 		=> {}}
						current 			= {itemId}
						{...resitryProps}
					/>
				}

				{mode === MODE_NEW_ITEM &&
					<Fragment>
						<Typography variant="h6" color="inherit" className={classes.title}>
							{LABEL_NEW_RECORD}
						</Typography>
						<NewItem
							onClick = {(item) => {
								this.props.setState({ mode: '', itemId: item.id })
							}}
							extraAction = {() => {}}
							{...newItemProps}
						/>
					</Fragment>
				}

				{mode === MODE_EDIT_ITEM &&
					<Fragment>
						<Typography variant="h6" color="inherit" className={classes.title}>
							{LABEL_EDIT_RECORD}
						</Typography>
						<EditItem
							onClick = {(item) => {
								this.props.setState({ mode: '', itemId: item.id })
							}}
							extraAction = {() => {}}
							{...editItemProps}
						/>
					</Fragment>
				}

				{mode === MODE_DELETE_ITEM &&
					<DeleteItem
						onClick = {(item) => {
							this.props.setState({ mode: '', itemId: '' })
						}}
						extraAction = {() => {}}
						{...deleteItemProps}
					/>
				}
			</Fragment>
		)
	}
}

export default withStyles(styles)(ContentList)
