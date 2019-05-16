import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import * as Queries 	from '../../database/queries'
import * as Mutations	from '../../database/mutations'

import DeviceHubIcon 	from '@material-ui/icons/DeviceHub'
import PeopleIcon 		from '@material-ui/icons/People'
import ListIcon 			from '@material-ui/icons/List'
import ScheduleIcon 	from '@material-ui/icons/Schedule'
import ArchiveIcon 		from '@material-ui/icons/Archive'

import Layout 				from '../../layouts/Admin/AdminLayout/AdminLayout.tsx'
import PrimaryDataset	from '../../layouts/Admin/PrimaryDataset/PrimaryDataset.js'

import Events 	from './events/Events'
import Results 	from './results/Results'

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

const Main = () => (
	<Layout
		title={APP_TITLE}
		menu={Menu}
		workspace={
			<Switch>
				<Route path="/admin" exact component={null} />

				<Route path="/admin/regions" component={() => (
					<PrimaryDataset
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
					/>
				)}/>

				<Route path="/admin/tests" component={() => (
					<PrimaryDataset
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
					/>
				)}/>

				<Route path="/admin/members" component={() => (
					<PrimaryDataset
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
					/>
				)}/>

				<Route path="/admin/events" component={() => <Events/>} />
				<Route path="/admin/results" component={() => <Results/>} />
				<Route path="/*" render={() => <Redirect to="/admin" />}/>
			</Switch>
		}
	/>
)

export default Main
