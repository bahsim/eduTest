import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import * as Queries 	from '../../database/queries'
import * as Mutations	from '../../database/mutations'

import DeviceHubIcon 	from '@material-ui/icons/DeviceHub'
import PeopleIcon 		from '@material-ui/icons/People'
import ListIcon 			from '@material-ui/icons/List'
import ScheduleIcon 	from '@material-ui/icons/Schedule'
import ArchiveIcon 		from '@material-ui/icons/Archive'

import Layout 				from '../../layouts/Admin/layout/AdministratorLayout.tsx'
import Workspace			from '../../layouts/Admin/container.js'

import RegionDetails	from './contentRegions/RegionDetails.tsx'
import MembersList 		from './contentMembers/MembersList.tsx'
import TestItems 			from './contentTests/TestItems.tsx'

import FilterEvents		from './Events/FilterEvents.tsx'

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

const Main = () => (
	<Layout
		title='Администратор'
		menu={Menu}
		workspace={
			<Switch>
				<Route path="/admin" exact component={null} />

				<Route path="/admin/regions" component={() => (
					<Workspace
						type='PrimaryDataSimple'
						params={{
							baseURL				: '/admin/regions',
							labelName 		: 'Регионы',
							labelListName	: 'Наименование',
							labelNew			: 'Новый регион',
							queryList			: Queries.QUERY_REGIONS,
							queryItem			: Queries.QUERY_REGION,
							mutateAdd			: Mutations.MUTATE_ADD_REGION,
							mutateEdit		: Mutations.MUTATE_EDIT_REGION,
							mutateDel			: Mutations.MUTATE_DELETE_REGION,
						}}
						content={{
							viewItem: {
								component				: RegionDetails,
								params: {
									queryItem			: Queries.QUERY_REGION,
									mutateEdit		: Mutations.MUTATE_EDIT_MODERATOR,
								}
							},
						}}
					/>
				)}/>

				<Route path="/admin/tests" component={() => (
					<Workspace
						type='PrimaryDataSimple'
						params={{
							baseURL				: '/admin/tests',
							labelName 		: 'Тесты',
							labelListName	: 'Наименование',
							labelNew			: 'Новый тест',
							queryList			: Queries.QUERY_TESTS,
							queryItem			: Queries.QUERY_TEST,
							mutateAdd			: Mutations.MUTATE_ADD_TEST,
							mutateEdit		: Mutations.MUTATE_EDIT_TEST,
							mutateDel			: Mutations.MUTATE_DELETE_TEST,
						}}
						content={{
							viewItem: {
								component				: TestItems,
								params: {
									queryList			: Queries.QUERY_TESTITEMS,
									queryItem			: Queries.QUERY_TESTITEM,
									labelListName	: 'Вопросы',
									mutateAdd			: Mutations.MUTATE_ADD_TESTITEM,
									mutateEdit		: Mutations.MUTATE_EDIT_TESTITEM,
									mutateDelete	: Mutations.MUTATE_DELETE_TESTITEM,
								}
							},
						}}
					/>
				)}/>

				<Route path="/admin/members" component={() => (
					<Workspace
						type='PrimaryDataWithGroup'
						params={{
							groupParams	: {
								labelListName	: 'Регионы',
								queryList			: Queries.QUERY_REGIONS,
							},
							baseURL				: '/admin/members',
							labelName 		: 'Участники',
							labelListName	: 'Группы',
							labelNew			: 'Новая группа',
							queryList			: Queries.QUERY_REGION_GROUPS,
							queryItem			: Queries.QUERY_GROUP,
							mutateAdd			: Mutations.MUTATE_ADD_GROUP,
							mutateEdit		: Mutations.MUTATE_EDIT_GROUP,
							mutateDel			: Mutations.MUTATE_DELETE_GROUP,
						}}
						content={{
							viewItem: {
								component				: MembersList,
								params: {
									queryList			: Queries.QUERY_MEMBERS,
									queryItem			: Queries.QUERY_MEMBER,
									labelListName	: 'Фамилия Имя Отчество',
									mutateAdd			: Mutations.MUTATE_ADD_MEMBER,
									mutateEdit		: Mutations.MUTATE_EDIT_MEMBER,
									mutateDelete	: Mutations.MUTATE_DELETE_MEMBER,
								}
							},
						}}
					/>
				)}/>

				<Route path="/admin/events" component={() => (
					<Workspace
						type='SecondaryData'
						params={{
							role					: 'current',
							baseURL				: '/admin/events',
							labelName 		: 'Мероприятия',
							labelListName	: 'Наименование',
							labelNew			: 'Новое мепроприятие',
							queryList			: Queries.QUERY_EVENTS_CURRENT,
							queryItem			: Queries.QUERY_EVENT,
							mutateAdd			: Mutations.MUTATE_ADD_EVENT,
							mutateDel			: Mutations.MUTATE_DELETE_EVENT,
						}}
						components={{
							filter: FilterEvents,
						}}
						content={{}}
					/>
				)}/>

				<Route path="/admin/results" component={() => null} />
				<Route path="/*" render={() => <Redirect to="/admin" />}/>
			</Switch>
		}
	/>
)

export default Main
