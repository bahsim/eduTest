import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Workspace 		from './Workspace/Workspace.tsx'

import ViewList			from './components/ViewList.tsx'
import NewRecord 		from './components/NewRecord.tsx'
import ViewRecord 	from './components/ViewRecord.tsx'
import DeleteRecord	from './components/DeleteRecord.tsx'

const PrimaryDataset = (props) => {
	const {
		baseURL,
		labelName,
		labelNew,
		queryList,
		queryItem,
		mutateAdd,
		mutateEdit,
		mutateDel,
	} = props.params

	return (
		<div>
			<Switch>
				<Route path={baseURL} exact component={() => (
					<Workspace>
						<ViewList
							{...props}
							{...{
						    linkBack    : baseURL,
								breadcrumbs : labelName,
						    queryProps: {
						      query				: queryList,
								  queryParams	: {}
							  },
							}}
						/>
					</Workspace>
				)}/>
				<Route path={`${baseURL}/new`} exact component={() => (
					<Workspace>
						<NewRecord
							{...props}
							{...{
								linkBack    : baseURL,
							  breadcrumbs : [ labelName, labelNew ],
							  queryProps: {
							    mutation	: mutateAdd,
							    update		: queryList,
							  },
							}}
						/>
					</Workspace>
				)}/>
				<Route path={`${baseURL}/:id/delete`} exact component={(params) => (
					<Workspace>
						<DeleteRecord
							{...props}
							{...{
								linkBack    : baseURL,
								breadcrumbs : labelName,
						    queryProps: {
									query			: queryItem,
									mutation	: mutateDel,
									update		: queryList,
									queryParams: {
										id	: params.match.params.id
									}
						    },
							}}
						/>
					</Workspace>
				)}/>
				<Route path={`${baseURL}/:id`} exact component={(params) => (
					<Workspace>
						<ViewRecord
							{...props}
							{...{
								linkBack    : baseURL,
						    breadcrumbs : labelName,
						    queryProps: {
						      query			: queryItem,
						  		mutation	: mutateEdit,
						      queryParams: {
						        id: params.match.params.id
						      },
						    },
							}}
						/>
					</Workspace>
				)}/>
				<Route path={`${baseURL}*`} exact component={() => (
					<Redirect to="/admin/regions" />
				)}/>
			</Switch>
		</div>
	)
}

export default PrimaryDataset
