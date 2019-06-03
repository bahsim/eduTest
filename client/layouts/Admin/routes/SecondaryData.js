import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import queryString from 'query-string'
import moment from 'moment'

import Workspace  from '../workspace/AdministratorWorkspace.tsx'

import SimpleList   from '../components/SimpleList.tsx'
import NewRecord    from '../components/NewRecord.tsx'
import ViewRecord   from '../components/ViewRecord.tsx'
import DeleteRecord from '../components/DeleteRecord.tsx'

export default (props) => {
	const {
		baseURL,
		labelListName,
		queryList,
		queryItem,
		mutateAdd,
		mutateEdit,
		mutateDel,
	} = props

	const Filter = props.components.filter
	const NewItem = props.components.newItem
	const ViewItem = props.components.viewItem

	const getUrlQueryParam = (search, param) => {
		const params = queryString.parse(search)
		return params[param] ? params[param] : ''
	}

	return (
		<Switch>
      <Route path={baseURL} exact component={(extra) => (
        <Workspace datasetType="secondary" componentType="filter" {...props}>
          <Filter
						urlQueryParams={queryString.parse(extra.location.search)}
						{...props.filterParams}
						{...extra}
					/>
					<SimpleList
						queryProps={{
							query				: props.queryList,
							queryParams : queryString.parse(extra.location.search)
						}}
						label={props.labelListName}
						formatListRow={(item) => {
							const { name, dateStart, region, group} = item
							const date = moment.unix(dateStart/1000).format('DD.MM HH:mm')
							return {
								primary		: name,
								secondary	: `${date}, ${region.name}, ${group.name}`,
						}}}
					/>
        </Workspace>
      )}/>
			{NewItem &&
				<Route path={`${baseURL}/new`} exact component={(extra) => (
	        <Workspace datasetType="secondary" componentType="newItem" {...props}>
	          <NewItem
							urlQueryParams={queryString.parse(extra.location.search)}
	            queryProps = {{
	              mutation    : mutateAdd,
	              update      : queryList,
	              updateParams: {
									regionId: getUrlQueryParam(extra.location.search,'regionId'),
									groupId	: getUrlQueryParam(extra.location.search,'groupId'),
								},
	            }}
							{...props.newItemParams}
							{...extra}
	          />
						{getUrlQueryParam(extra.location.search, 'testId') !== '' &&
							<SimpleList
								queryProps={{
									...props.newItemTestParams.queryProps,
									queryParams : {
										testId: getUrlQueryParam(extra.location.search,'testId')
									},
								}}
								label={props.newItemTestParams.labelListName}
								formatListRow={(item) => ({
									primary		: item.value,
									secondary	: item.variants.map((variant, index) => (
										(variant.mark === true ?
											<span key={index} style={{fontWeight: 'bold'}}>
												{`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
											</span>
										:
											<span key={index}>
												{`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
											</span>
										)
									))
								})}
							/>
						}
	        </Workspace>
	      )}/>
			}
      <Route path={`${baseURL}/items/:id`} exact component={(extra) => (
				<Workspace datasetType="secondary" componentType="viewItem" {...props}>
					<ViewItem
						urlQueryParams={queryString.parse(extra.location.search)}
						queryProps = {{
							query    		: queryItem,
							queryParams : { id: extra.match.params.id },
						}}
						{...extra}
					/>
				</Workspace>
      )}/>
      <Route path={`${baseURL}/items/:id/delete`} exact component={(extra) => (
        <Workspace datasetType="secondary" componentType="deleteItem" {...props}>
          <DeleteRecord
            queryProps = {{
      				query			  : queryItem,
      				mutation    : mutateDel,
              queryParams : { id: extra.match.params.id },
      				update			: queryList,
							updateParams: {
								regionId: getUrlQueryParam(extra.location.search,'regionId'),
								groupId	: getUrlQueryParam(extra.location.search,'groupId'),
							},
            }}
          />
        </Workspace>
      )}/>
			<Route path={`${baseURL}*`} exact component={() => (
				<Redirect to={baseURL} />
			)}/>
		</Switch>
	)
}
