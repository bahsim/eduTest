import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import RegionsList from '../../../common/components/RegionsList'
import GroupsList from '../../../common/components/GroupsList'

import NewGroup from './NewGroup'
import EditGroup from './EditGroup'
import DeleteGroup from './DeleteGroup'

const styles = theme => ({
	groupsList: {
		overflow: 'auto',
	}
})

const panelAction = (action, icon, label) => ({ type: 'action', action, icon, label })

const PANEL_BACK 				= panelAction('goBack', ArrowBackIcon, 'Назад')
const PANEL_ADD_GROUP 	= panelAction('newGroup', AddIcon, 'Добавить группу')
const PANEL_EDIT_GROUP 	= panelAction('editGroup', EditIcon, 'Изменить группу')
const PANEL_DEL_GROUP 	= panelAction('deleteGroup', DeleteForeverIcon, 'Удалить группу')
const PANEL_ADD_ITEM 		= panelAction('addItem', AddIcon, 'Добавить участника')
const PANEL_EDIT_ITEM 	= panelAction('editItem', EditIcon, 'Изменить участника')

const BREADCRUMBS_MEMBERS 	= 'Участники'
const BREADCRUMBS_NEW_GROUP = 'Новая группа'

const MODE_MAIN 			= 'MAIN'
const MODE_NEW_GROUP 	= 'NEW_GROUP'
const MODE_EDIT_GROUP = 'EDIT_GROUP'
const MODE_DEL_GROUP 	= 'DELETE_GROUP'
const MODE_NEW_ITEM 	= 'NEW_ITEM'
const MODE_EDIT_ITEM 	= 'EDIT_ITEM'
const MODE_DEL_ITEM 	= 'DELETE_ITEM'

const LABEL_REGION 	= 'Регион'
const LABEL_GROUP 	= 'Группа'

class Members extends Component {  
	state = {
		regionName	: '',
		regionId		: '',
		groupName		: '',
		groupId			: '',
		mode				: MODE_MAIN,
		breadcrumbs	: [],
		panel				: [],
		panelAction	: '',
	}
	
	componentDidMount() {
		const { setPanel, setBreadcrumbs } = this.props
				
		setPanel([])
		setBreadcrumbs([BREADCRUMBS_MEMBERS])
	}	
	
	componentDidUpdate(prevProps) {
		this.catchParentActions(prevProps)
	}
	
	catchParentActions = (prevProps) => {
		const { panelAction, setPanel, setBreadcrumbs } = this.props
		const { regionName, panel, breadcrumbs } = this.state
		
		if (panelAction === prevProps.panelAction || panelAction === this.state.panelAction) return
		
		switch(panelAction) {
			case PANEL_ADD_GROUP.action:
				this.setState({ panelAction, mode: MODE_NEW_GROUP })
				setPanel([{...PANEL_BACK}])
				setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName, BREADCRUMBS_NEW_GROUP])
				break
			case PANEL_EDIT_GROUP.action:
				this.setState({ panelAction, mode: MODE_EDIT_GROUP })
				setPanel([{...PANEL_BACK}])
				break
			case PANEL_DEL_GROUP.action:
				this.setState({ panelAction, mode: MODE_DEL_GROUP })
				setPanel([{...PANEL_BACK}])
				break
			case PANEL_BACK.action:
				this.setState({ panelAction, mode: MODE_MAIN })
				setPanel(panel)
				setBreadcrumbs(breadcrumbs)
				break
		}
	}
	
	handleSaveNewGroup = () => {
		const { setPanel, setBreadcrumbs } = this.props
		const { panelAction, panel, breadcrumbs } = this.state
		
		this.setState({ panelAction: '', mode: MODE_MAIN })
		setPanel(panel)
		setBreadcrumbs(breadcrumbs)
	}
	
	handleDeleteGroup = (newName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { panelAction, panel, breadcrumbs, regionName, groupName } = this.state
		
		setPanel({...PANEL_ADD_GROUP})
		setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName])
		this.setState({ 
			panelAction: '', 
			mode: MODE_MAIN, 
			groupId: '', 
			groupName: ''
		})
		setPanel(panel)
		setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName, newName])
	}

	handleSaveEditGroup = (newName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { panelAction, panel, breadcrumbs, regionName, groupName } = this.state
		
		this.setState({ panelAction: '', mode: MODE_MAIN, groupName: newName })
		setPanel(panel)
		setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName, newName])
	}
	
	handleDeleteGroup = (newName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { regionName } = this.state
		
		this.setState({ 
			panelAction: '', 
			mode: MODE_MAIN, 
			groupId: '', 
			groupName: ''
		})

		setPanel([{...PANEL_ADD_GROUP}])
		setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName])
	}

	selectRegion = (regionId, regionName) => {
		const { setPanel, setBreadcrumbs } = this.props
		
		const panel = [{...PANEL_ADD_GROUP}]
		setPanel(panel)
		
		const breadcrumbs = [BREADCRUMBS_MEMBERS, regionName]
		setBreadcrumbs(breadcrumbs)
		
		this.setState({ panel, breadcrumbs, regionId, regionName, groupId: '', groupName: '' })
	}
	
	selectGroup = (groupId, groupName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { regionName } = this.state
		
		const panel =[
			{...PANEL_ADD_GROUP},
			{...PANEL_EDIT_GROUP},
			{...PANEL_DEL_GROUP},
			{...PANEL_ADD_ITEM}
		]
		setPanel(panel)
		
		const breadcrumbs =[BREADCRUMBS_MEMBERS, regionName, groupName]
		setBreadcrumbs(breadcrumbs)
		
		this.setState({ panel, breadcrumbs, groupId, groupName })
	}
	
	render() {
		const { classes, queryData, height } = this.props
		const { regionId, groupId, mode } = this.state
		
		const listStyle = { height, overflow: 'auto' }
		
		const listsDisplay = (
			mode === MODE_MAIN ? {display: ''} : { display: 'none'}
		)
		
		return (
			<div>
				<div style={listsDisplay}>
					<Grid container alignItems="stretch" spacing={8}>
						<Grid item xs={3}>
							<div style={listStyle}>
								<RegionsList
									label={LABEL_REGION}
									selectedItem={regionId} 
									onClick={this.selectRegion} 
								/>
							</div>
						</Grid>
						<Grid item xs={3}>
							<div style={listStyle}>
								{regionId !== '' &&
									<GroupsList
										regionId={regionId}
										label={LABEL_GROUP}
										selectedItem={groupId} 
										onClick={this.selectGroup} 
									/>
								}
							</div>
						</Grid>
						<Grid item xs={6}>
							<div style={listStyle}>
								items
							</div>
						</Grid>
					</Grid>
				</div>
				{mode === MODE_NEW_GROUP &&
					<NewGroup 
						regionId={regionId} 
						onSave={this.handleSaveNewGroup}
					/>
				}
				{mode === MODE_EDIT_GROUP &&
					<EditGroup 
						groupId={groupId} 
						onSave={this.handleSaveEditGroup}
					/>
				}
				{mode === MODE_DEL_GROUP &&
					<DeleteGroup 
						groupId={groupId} 
						regionId={regionId} 
						onDelete={this.handleDeleteGroup}
					/>
				}
			</div>
		)
	}	
}

export default withStyles(styles)(
	withRouter(Members)
)
	