import React from 'react'
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom'

import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import ListIcon from '@material-ui/icons/List';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArchiveIcon from '@material-ui/icons/Archive';

import Layout from '../../../layouts/AdministratorLayout'

import Workspace from './Workspace'

import Regions from '../components/Regions'
import NewRegion from '../components/NewRegion'
import EditRegion from '../components/EditRegion'
import DeleteRegion from '../components/DeleteRegion'

import Members from '../components/Members'

import Tests from '../components/Tests'
import Events from '../components/Events'
import Results from '../components/Results'

const Menu = [
	{
		link	: '/admin/regions',
		icon	: <DeviceHubIcon/>,
		label	:	'Регионы',
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

const Main = (props) => (
	<Layout 
		title="Администратор"
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
				<Route path="/admin/regions/edit" exact component={() => (
					<Workspace MainComponent={EditRegion} />
				)}/>
				<Route path="/admin/regions/delete" exact component={() => (
					<Workspace MainComponent={DeleteRegion} />
				)}/>
				
				
				<Route path="/admin/regions/members" exact component={() => (
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

export default Main