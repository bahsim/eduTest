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

const LABEL_ADD 				= 'Добавить'
const LABEL_EDIT 				= 'Изменить'
const LABEL_DELETE 			= 'Удалить'
const LABEL_CANCEL 			= 'Отмена'
const LABEL_NEW_RECORD 	= 'Новая запись'
const LABEL_EDIT_RECORD = 'Изменение записи'

const styles = theme => ({
	title: {
		marginTop: theme.spacing.unit*2
	},
	button: {
		margin      : theme.spacing.unit/2,
		marginRight : theme.spacing.unit*2,
	},
  icon: {
		marginRight : theme.spacing.unit,
	}
})

class MembersList extends Component {

	state = {
		mode		: 'registry',
		itemId	: '',
	}

	render() {

		if (!this.props.data.ownerId) return null

		const { mode, itemId } = this.state
		const { classes } = this.props

		const panelButton = (Icon, label, mode) => (
			<Button className = {classes.button}
				onClick={() => this.setState({ mode })}
			>
				<Icon className={classes.icon}/>
				{label}
			</Button>
		)

		const componentRegistry = (
			<SimpleList
				queryProps = {{
					query       : this.props.queryList,
					queryParams : { groupId	: this.props.data.ownerId },
				}}
				onClick				= {(item)	=> this.setState({ itemId: item.id})}
				onDoubleClick = {() 		=> this.setState({ mode: 'editItem'})}
				extraAction 	= {() 		=> {}}
				current 			= {itemId}
				label 				= {this.props.labelListName}
			/>
		)

		const componentNewRecord = (
			<Fragment>
				<Typography variant="h6" color="inherit" className={classes.title}>
					{LABEL_NEW_RECORD}
				</Typography>
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
						this.setState({ mode: 'registry', itemId: item.id })
					}}
					extraAction = {() => {}}
				/>
			</Fragment>
		)

		const componentEditRecord = (
			<Fragment>
				<Typography variant="h6" color="inherit" className={classes.title}>
					{LABEL_EDIT_RECORD}
				</Typography>
				<EditRecord
					queryProps = {{
						query			    : this.props.queryItem,
						mutation      : this.props.mutateEdit,
						queryParams   : { id: this.state.itemId },
						update        : this.props.queryList,
						updateParams	: { groupId : this.props.data.ownerId },
					}}
					onClick = {(item) => {
						this.setState({ mode: 'registry', itemId: item.id })
					}}
					extraAction = {() => {}}
				/>
			</Fragment>
		)

		const componentDeleteRecord = (
			<Fragment>
				<DeleteRecord
					queryProps = {{
						query			    : this.props.queryItem,
						mutation      : this.props.mutateDelete,
						queryParams   : { id: this.state.itemId },
						update		    : this.props.queryList,
						updateParams	: { groupId : this.props.data.ownerId },
					}}
					onClick = {(item) => {
						this.setState({ mode: 'registry', itemId: '' })
					}}
					extraAction = {() => {}}
				/>
			</Fragment>
		)

		return (
			<Fragment>
				<Divider />
				{mode === 'registry' &&
					<Fragment>
						{panelButton(AddIcon, LABEL_ADD, 'newItem')}
						{itemId !== '' &&
							<Fragment>
								{panelButton(EditIcon, LABEL_EDIT, 'editItem')}
								{panelButton(DeleteIcon, LABEL_DELETE, 'deleteItem')}
							</Fragment>
						}
						<Divider />
						{componentRegistry}
					</Fragment>
				}
				{mode === 'newItem' &&
					<Fragment>
						{panelButton(ArrowBackIcon, LABEL_CANCEL, 'registry')}
						<Divider />
						{componentNewRecord}
					</Fragment>
				}
				{mode === 'editItem' &&
					<Fragment>
						{panelButton(ArrowBackIcon, LABEL_CANCEL, 'registry')}
						<Divider />
						{componentEditRecord}
					</Fragment>
				}
				{mode === 'deleteItem' &&
					<Fragment>
						{panelButton(ArrowBackIcon, LABEL_CANCEL, 'registry')}
						<Divider />
						{componentDeleteRecord}
					</Fragment>
				}
			</Fragment>
		)
	}
}

export default withStyles(styles)(MembersList)
