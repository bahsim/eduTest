import React from 'react'
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom'

import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import PeopleIcon from '@material-ui/icons/People'
import ListIcon from '@material-ui/icons/List';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArchiveIcon from '@material-ui/icons/Archive';

import Layout from '../../../layouts/AdministratorLayout'

import Workspace from './Workspace'

import Regions from '../components/regions/Regions'
import ViewRegion from '../components/regions/ViewRegion'
import NewRegion from '../components/regions/NewRegion'
import DeleteRegion from '../components/regions/DeleteRegion'

import Members from '../components/members/Members'

import Tests from '../components/tests/Tests'
import Events from '../components/events/Events'
import Results from '../components/results/Results'

const APP_TITLE = 'Администратор'

const Menu = [
	{
		link	: '/admin/regions',
		icon	: <DeviceHubIcon/>,
		label	:	'Регионы',
	},
	{
		link	: '/admin/members',
		icon	: <PeopleIcon/>,
		label	:	'Участники',
	},
	{
		link	: '/admin/tests',
		icon	: <ListIcon/>,
		label	:	'Тесты',
	},
	{
		link	: '/admin/events',
		icon	: <ScheduleIcon/>,
		label	:	'Мероприятия',
	},
	{
		link	: '/admin/results',
		icon	: <ArchiveIcon/>,
		label	:	'Результаты',
	},
]

const Main = (props) => {
	
	return (
		<Layout 
			title={APP_TITLE}
			menu={Menu}
			workspace={
				<Switch>
					<Route path="/admin" exact component={null} />
					
					<Route path="/admin/regions" exact component={() => (
						<Workspace MainComponent={Regions} />
					)}/>
					<Route path="/admin/regions/new" exact component={() => (
						<Workspace MainComponent={NewRegion} />
					)}/>
					<Route path="/admin/regions/:id/delete" exact component={() => (
						<Workspace MainComponent={DeleteRegion} />
					)}/>
					<Route path="/admin/regions/:id" exact component={() => (
							<Workspace MainComponent={ViewRegion} />
					)}/>
					
					<Route path="/admin/members" exact component={() => (
						<Workspace MainComponent={Members} />
					)}/>
					
					<Route path="/admin/tests" component={() => <Tests/>} />
					<Route path="/admin/events" component={() => <Events/>} />
					<Route path="/admin/results" component={() => <Results/>} />
					<Route path="/*" render={() => <Redirect to="/admin" />}/>
				</Switch>
			}
		/>
	)
}

export default Main