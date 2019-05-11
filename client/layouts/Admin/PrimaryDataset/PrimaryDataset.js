import React, {Fragment} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { cloneDeep } from 'lodash'

import Workspace 		from './Workspace/Workspace.tsx'
import ViewList			from './components/ViewList.tsx'
import NewRecord 		from './components/NewRecord.tsx'
import ViewRecord 	from './components/ViewRecord.tsx'
import DeleteRecord	from './components/DeleteRecord.tsx'

const PrimaryDataset = (props) => {
	const {
		isDependent,
		isGrouped,
		parentParams,
		groupParams,
		baseURL,
		labelName,
		labelListName,
		labelNew,
		queryList,
		queryItem,
		mutateAdd,
		mutateEdit,
		mutateDel,
	} = props.params

	const routesList = []

	const GatherRoutes = () => {
		if (isDependent === true && isGrouped === false) {
			isDependentIsntGroupedRoutes()
		}
		if (isDependent === true && isGrouped === true) {
			isDependentIsGroupedRoutes()
		}
		if (isDependent === false && isGrouped === true) {
			isntDependentIsGroupedRoutes()
		}
		if (isDependent === false && isGrouped === false) {
			isntDependentIsntGroupedRoutes()
		}
	}

	const isDependentIsntGroupedRoutes = () => {
		routesList.push({
			component	: ViewList,
			path			: baseURL,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 1,
				breadcrumbs 	: labelName,
				labelListName	: parentParams.labelListName,
				listMode			: 'select',
				queryProps: {
					query				: parentParams.queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: ViewList,
			path			: `${baseURL}/parent/:parentId/items`,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 1,
				breadcrumbs 	: labelName,
				labelListName	: labelListName,
				listMode			: 'edit',
				queryProps: {
					query				: queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: NewRecord,
			path			: `${baseURL}/parent/:parentId/items/new`,
			exact			: true,
			params: {
				rootLink    : baseURL,
				level					: 2,
				breadcrumbs : [ labelName, labelNew ],
				queryProps: {
					mutation	: mutateAdd,
					update		: queryList,
				},
			}
		})
	}

	const isDependentIsGroupedRoutes = () => {
		routesList.push({
			component	: ViewList,
			path			: baseURL,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 1,
				breadcrumbs 	: labelName,
				labelListName	: parentParams.labelListName,
				listMode			: 'select',
				queryProps: {
					query				: parentParams.queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: ViewList,
			path			: `${baseURL}/parent/:parentId/groups`,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 2,
				breadcrumbs 	: labelName,
				labelListName	: groupParams.labelListName,
				listMode			: 'select',
				queryProps: {
					query				: groupParams.queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: ViewList,
			path			: `${baseURL}/parent/:parentId/groups/:groupId/items`,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 3,
				breadcrumbs 	: labelName,
				labelListName	: labelListName,
				listMode			: 'edit',
				queryProps: {
					query				: queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: NewRecord,
			path			: `${baseURL}/parent/:parentId/groups/:groupId/items/new`,
			exact			: true,
			params: {
				rootLink    : baseURL,
				level					: 3,
				breadcrumbs : [ labelName, labelNew ],
				queryProps: {
					mutation	: mutateAdd,
					update		: queryList,
				},
			}
		})
	}

	const isntDependentIsGroupedRoutes = () => {
		routesList.push({
			component	: ViewList,
			path			: baseURL,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 1,
				breadcrumbs 	: labelName,
				listMode			: 'select',
				labelListName	: groupParams.labelListName,
				queryProps: {
					query				: groupParams.queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: ViewList,
			path			: `${baseURL}/groups/:groupId/items`,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 2,
				breadcrumbs 	: labelName,
				labelListName	: labelListName,
				listMode			: 'edit',
				queryProps: {
					query				: queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: NewRecord,
			path			: `${baseURL}/groups/:groupId/items/new`,
			exact			: true,
			params: {
				rootLink    : baseURL,
				level					: 2,
				breadcrumbs : [ labelName, labelNew ],
				queryProps: {
					mutation	: mutateAdd,
					update		: queryList,
				},
			}
		})
	}

	const isntDependentIsntGroupedRoutes = () => {
		routesList.push({
			component	: ViewList,
			path			: baseURL,
			exact			: true,
			params: {
				rootLink    	: baseURL,
				level					: 1,
				breadcrumbs 	: labelName,
				listMode			: 'edit',
				labelListName	: labelListName,
				queryProps: {
					query				: queryList,
					queryParams	: {}
				}
			}
		})
		routesList.push({
			component	: NewRecord,
			path			: `${baseURL}/new`,
			exact			: true,
			params: {
				rootLink    : baseURL,
				breadcrumbs : [ labelName, labelNew ],
				queryProps: {
					mutation	: mutateAdd,
					update		: queryList,
				},
			}
		})
	}

	GatherRoutes()

	routesList.push({
		component	: ViewRecord,
		path			: `${baseURL}/items/:id`,
		exact			: true,
		params: {
			rootLink    : baseURL,
			breadcrumbs : labelName,
			queryProps: {
				query			: queryItem,
				mutation	: mutateEdit,
			},
		}
	})

	routesList.push({
		component	: DeleteRecord,
		path			: `${baseURL}/:id/delete`,
		exact			: true,
		params: {
			rootLink    : baseURL,
			breadcrumbs : labelName,
			queryProps: {
				query			: queryItem,
				mutation	: mutateDel,
				update		: queryList,
			},
		}
	})

	const RouteItem = ({route, index}) => (
		<Route path={route.path} exact={route.exact} component={(extra) => {
			const params = cloneDeep(route.params)
			params.queryProps.queryParams = {
				...params.queryProps.queryParams,
				...extra.match.params,
			}
			return(
				<Workspace>
					<route.component {...props} {...params} />
				</Workspace>
			)
		}}/>
	)

	return (
		<Fragment>
			<Switch>
				<Fragment>
					{routesList.map((route, index) => (
						<Fragment key={index}>
							<RouteItem route={route} index={index} />
						</Fragment>
					))}
				</Fragment>
				<Route path={`${baseURL}*`} exact component={() => (
					<Redirect to="/admin/regions" />
				)}/>
			</Switch>
		</Fragment>
	)
}

export default PrimaryDataset
