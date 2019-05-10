import React, { Component } from 'react'
import { withRouter } 			from 'react-router-dom'

import { withStyles } 		from '@material-ui/core/styles'
import Grid 							from '@material-ui/core/Grid'
import ArrowBackIcon 			from '@material-ui/icons/ArrowBack'
import AddIcon 						from '@material-ui/icons/Add'
import EditIcon 					from '@material-ui/icons/Edit'
import DeleteForeverIcon 	from '@material-ui/icons/DeleteForever'

import RegionsList 	from '../../../components/Administrator/RegionsList.tsx'
import GroupsList 	from '../../../components/Administrator/GroupsList.tsx'
import MembersList 	from '../../../components/Administrator/MembersList.tsx'

import NewGroup 		from './NewGroup.tsx'
import EditGroup 		from './EditGroup.tsx'
import DeleteGroup 	from './DeleteGroup.tsx'

import NewMember 		from './NewMember.tsx'
import EditMember 	from './EditMember.tsx'
import DeleteMember from './DeleteMember.tsx'

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
const PANEL_ADD_MEMBER 	= panelAction('addMember', AddIcon, 'Добавить участника')
const PANEL_EDIT_MEMBER = panelAction('editMember', EditIcon, 'Изменить участника')
const PANEL_DEL_MEMBER 	= panelAction('deleteMember', DeleteForeverIcon, 'Удалить участника')

const BREADCRUMBS_MEMBERS 		= 'Участники'
const BREADCRUMBS_NEW_GROUP 	= 'Новая группа'
const BREADCRUMBS_NEW_MEMBER 	= 'Новая запись'

const MODE_MAIN 				= 'MAIN'
const MODE_NEW_GROUP 		= 'NEW_GROUP'
const MODE_EDIT_GROUP 	= 'EDIT_GROUP'
const MODE_DEL_GROUP 		= 'DELETE_GROUP'
const MODE_NEW_MEMBER 	= 'NEW_MEMBER'
const MODE_EDIT_MEMBER 	= 'EDIT_MEMBER'
const MODE_DEL_MEMBER 	= 'DELETE_MEMBER'

const LABEL_REGIONS_LIST 	= 'Регионы'
const LABEL_GROUPS_LIST 	= 'Группы'
const LABEL_MEMBERS_LIST 	= 'Участники'

interface PanelArray {
  length: number;
  [item: number]: {type: string, action: any, icon: any, label: any };
}

interface BreadcrumbsArray {
  length: number;
  [item: number]: string
}

interface ComponentProps {
	classes: {
		groupsList	: object
	},
	setPanel			: (PanelArray) => any,
	setBreadcrumbs: (BreadcrumbsArray) => any,
	panelAction		: string,
	height				: string
}

interface ComponentState {
	regionName	: string,
	regionId		: string,
	groupName		: string,
	groupId			: string,
	memberName	: string,
	memberId		: string,
	mode				: string,
	breadcrumbs	: BreadcrumbsArray,
	panel				: PanelArray,
	panelAction	: string,
}

class Members extends Component< ComponentProps, ComponentState > {
	state = {
		regionName	: '',
		regionId		: '',
		groupName		: '',
		groupId			: '',
		memberName	: '',
		memberId		: '',
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
			case PANEL_ADD_MEMBER.action:
				this.setState({ panelAction, mode: MODE_NEW_MEMBER })
				setPanel([{...PANEL_BACK}])
				setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName, BREADCRUMBS_NEW_MEMBER])
				break
			case PANEL_EDIT_MEMBER.action:
				this.setState({ panelAction, mode: MODE_EDIT_MEMBER })
				setPanel([{...PANEL_BACK}])
				break
			case PANEL_DEL_MEMBER.action:
				this.setState({ panelAction, mode: MODE_DEL_MEMBER })
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

	handleSaveEditGroup = (newName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { panelAction, panel, breadcrumbs, regionName } = this.state

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

	handleSaveNewMember = () => {
		const { setPanel, setBreadcrumbs } = this.props
		const { panelAction, panel, breadcrumbs } = this.state

		this.setState({ panelAction: '', mode: MODE_MAIN })
		setPanel(panel)
		setBreadcrumbs(breadcrumbs)
	}

	handleSaveEditMember = (newName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { panelAction, panel, breadcrumbs, regionName, groupName } = this.state

		this.setState({ panelAction: '', mode: MODE_MAIN, memberName: newName })
		setPanel(panel)
		setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName, groupName, newName])
	}

	handleDeleteMember = (newName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { regionName, groupName } = this.state

		this.setState({
			panelAction: '',
			mode: MODE_MAIN,
			memberId: '',
			memberName: ''
		})

		setPanel([{...PANEL_ADD_GROUP}])
		setBreadcrumbs([BREADCRUMBS_MEMBERS, regionName, groupName])
	}

	selectRegion = (regionId, regionName) => {
		const { setPanel, setBreadcrumbs } = this.props

		const panel = [{...PANEL_ADD_GROUP}]
		setPanel(panel)

		const breadcrumbs = [BREADCRUMBS_MEMBERS, regionName]
		setBreadcrumbs(breadcrumbs)

		this.setState({
			panel,
			breadcrumbs,
			regionId,
			regionName,
			groupId: '',
			groupName: '',
			memberId: '',
			memberName: '',
		})
	}

	selectGroup = (groupId, groupName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { regionName } = this.state

		const panel =[
			{...PANEL_ADD_GROUP},
			{...PANEL_EDIT_GROUP},
			{...PANEL_DEL_GROUP},
			{...PANEL_ADD_MEMBER}
		]
		setPanel(panel)

		const breadcrumbs =[BREADCRUMBS_MEMBERS, regionName, groupName]
		setBreadcrumbs(breadcrumbs)

		this.setState({
			panel,
			breadcrumbs,
			groupId,
			groupName,
			memberId: '',
			memberName: '',
		})
	}

	selectMember = (memberId, memberName) => {
		const { setPanel, setBreadcrumbs } = this.props
		const { regionName, groupName } = this.state

		const panel =[
			{...PANEL_ADD_GROUP},
			{...PANEL_EDIT_GROUP},
			{...PANEL_DEL_GROUP},
			{...PANEL_ADD_MEMBER},
			{...PANEL_EDIT_MEMBER},
			{...PANEL_DEL_MEMBER},
		]
		setPanel(panel)

		const breadcrumbs =[BREADCRUMBS_MEMBERS, regionName, groupName, memberName]
		setBreadcrumbs(breadcrumbs)

		this.setState({ panel, breadcrumbs, memberId, memberName })
	}

	render() {
		const { classes, height } = this.props
		const { regionId, groupId, memberId, mode } = this.state

		const listStyle = { height, overflow: 'auto' }

		const listsDisplay = (
			mode === MODE_MAIN ? {display: ''} : { display: 'none'}
		)

		return (
			<div>
				<div style={listsDisplay}>
					<Grid container alignItems="stretch" spacing={8}>
						<Grid item xs={4}>
							<div style={listStyle}>
								<RegionsList
									label={LABEL_REGIONS_LIST}
									selectedItem={regionId}
									onClick={this.selectRegion}
								/>
							</div>
						</Grid>
						<Grid item xs={4}>
							<div style={listStyle}>
								{regionId !== '' &&
									<GroupsList
										regionId={regionId}
										label={LABEL_GROUPS_LIST}
										selectedItem={groupId}
										onClick={this.selectGroup}
									/>
								}
							</div>
						</Grid>
						<Grid item xs={4}>
							<div style={listStyle}>
								{groupId !== '' &&
									<MembersList
										regionId={regionId}
										groupId={groupId}
										label={LABEL_MEMBERS_LIST}
										selectedItem={memberId}
										onClick={this.selectMember}
									/>
								}
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
				{mode === MODE_NEW_MEMBER &&
					<NewMember
						regionId={regionId}
						groupId={groupId}
						onSave={this.handleSaveNewMember}
					/>
				}
				{mode === MODE_EDIT_MEMBER &&
					<EditMember
						memberId={memberId}
						onSave={this.handleSaveEditMember}
					/>
				}
				{mode === MODE_DEL_MEMBER &&
					<DeleteMember
						memberId={memberId}
						groupId={groupId}
						onDelete={this.handleDeleteMember}
					/>
				}
			</div>
		)
	}
}

export default withStyles(styles)(
	withRouter(Members)
)
