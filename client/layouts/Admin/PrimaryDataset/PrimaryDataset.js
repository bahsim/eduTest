import React from 'react'

import DatasetOneLevel	from './routes/DatasetOneLevel'
import DatasetWithGroup	from './routes/DatasetWithGroup'

export default (props) => {

	const { parentParams, groupParams } = props.params
	
	switch (true) {
		case !parentParams && !groupParams:
			return <DatasetOneLevel {...props.params} />
		case !parentParams && !!groupParams:
		case !!parentParams && !groupParams:
			return <DatasetWithGroup {...props.params} />
		case !!parentParams && !!groupParams:
			//
		default:
			return null
	}
}

// const datasetWithParent = () => {
// 	routesList.push({
// 		component	: ViewList,
// 		path			: baseURL,
// 		exact			: true,
// 		params: {
// 			rootLink    	: baseURL,
// 			level					: 1,
// 			breadcrumbs 	: labelName,
// 			labelListName	: parentParams.labelListName,
// 			listMode			: 'select',
// 			queryProps: {
// 				query				: parentParams.queryList,
// 				queryParams	: {}
// 			}
// 		}
// 	})
// 	routesList.push({
// 		component	: ViewList,
// 		path			: `${baseURL}/parent/:parentId/items`,
// 		exact			: true,
// 		params: {
// 			rootLink    	: baseURL,
// 			level					: 1,
// 			breadcrumbs 	: labelName,
// 			labelListName	: labelListName,
// 			listMode			: 'edit',
// 			queryProps: {
// 				query				: queryList,
// 				queryParams	: {}
// 			}
// 		}
// 	})
// 	routesList.push({
// 		component	: NewRecord,
// 		path			: `${baseURL}/parent/:parentId/items/new`,
// 		exact			: true,
// 		params: {
// 			rootLink    : baseURL,
// 			level					: 2,
// 			breadcrumbs : [ labelName, labelNew ],
// 			queryProps: {
// 				mutation	: mutateAdd,
// 				update		: queryList,
// 			},
// 		}
// 	})
// }
//
// const datasetWithParentGroup = () => {
// 	routesList.push({
// 		component	: ViewList,
// 		path			: baseURL,
// 		exact			: true,
// 		params: {
// 			rootLink    	: baseURL,
// 			level					: 1,
// 			breadcrumbs 	: labelName,
// 			labelListName	: parentParams.labelListName,
// 			listMode			: 'select',
// 			queryProps: {
// 				query				: parentParams.queryList,
// 				queryParams	: {}
// 			}
// 		}
// 	})
// 	routesList.push({
// 		component	: ViewList,
// 		path			: `${baseURL}/parent/:parentId/groups`,
// 		exact			: true,
// 		params: {
// 			rootLink    	: baseURL,
// 			level					: 2,
// 			breadcrumbs 	: labelName,
// 			labelListName	: groupParams.labelListName,
// 			listMode			: 'select',
// 			queryProps: {
// 				query				: groupParams.queryList,
// 				queryParams	: {}
// 			}
// 		}
// 	})
// 	routesList.push({
// 		component	: ViewList,
// 		path			: `${baseURL}/parent/:parentId/groups/:groupId/items`,
// 		exact			: true,
// 		params: {
// 			rootLink    	: baseURL,
// 			level					: 3,
// 			breadcrumbs 	: labelName,
// 			labelListName	: labelListName,
// 			listMode			: 'edit',
// 			queryProps: {
// 				query				: queryList,
// 				queryParams	: {}
// 			}
// 		}
// 	})
// 	routesList.push({
// 		component	: NewRecord,
// 		path			: `${baseURL}/parent/:parentId/groups/:groupId/items/new`,
// 		exact			: true,
// 		params: {
// 			rootLink    : baseURL,
// 			level					: 3,
// 			breadcrumbs : [ labelName, labelNew ],
// 			queryProps: {
// 				mutation	: mutateAdd,
// 				update		: queryList,
// 			},
// 		}
// 	})
// }
//
// const datasetWithGroup = () => {
// 	routesList.push({
// 		component	: ViewList,
// 		path			: baseURL,
// 		exact			: true,
// 		params: {
// 			rootLink    	: baseURL,
// 			level					: 1,
// 			breadcrumbs 	: labelName,
// 			listMode			: 'select',
// 			labelListName	: groupParams.labelListName,
// 			queryProps: {
// 				query				: groupParams.queryList,
// 				queryParams	: {}
// 			}
// 		}
// 	})
// 	routesList.push({
// 		component	: ViewList,
// 		path			: `${baseURL}/groups/:groupId/items`,
// 		exact			: true,
// 		params: {
// 			rootLink    	: baseURL,
// 			level					: 2,
// 			breadcrumbs 	: labelName,
// 			labelListName	: labelListName,
// 			listMode			: 'edit',
// 			queryProps: {
// 				query				: queryList,
// 				queryParams	: {}
// 			}
// 		}
// 	})
// 	routesList.push({
// 		component	: NewRecord,
// 		path			: `${baseURL}/groups/:groupId/items/new`,
// 		exact			: true,
// 		params: {
// 			rootLink    : baseURL,
// 			level					: 2,
// 			breadcrumbs : [ labelName, labelNew ],
// 			queryProps: {
// 				mutation	: mutateAdd,
// 				update		: queryList,
// 			},
// 		}
// 	})
// }
//
