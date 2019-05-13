import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Workspace  from '../Workspace/Workspace.tsx'

import SimpleList   from '../../../../components/common/SimpleList.tsx'
import NewRecord    from '../../../../components/common/NewRecord.tsx'
import ViewRecord   from '../../../../components/common/ViewRecord.tsx'
import DeleteRecord from '../../../../components/common/DeleteRecord.tsx'

const DatasetWithGroup = (props) => {
	const {
		baseURL,
		labelListName,
		queryList,
		queryItem,
		mutateAdd,
		mutateEdit,
		mutateDel,
	} = props

	return (
		<Switch>
      <Route path={baseURL} exact component={() => (
        <Workspace datasetType="withGroup" componentType="viewList"
					role="groups" {...props}
				>
          <SimpleList
            queryProps={{
              query       : props.groupParams.queryList,
              queryParams : {}
            }}
            label={props.groupParams.labelListName}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/groups/:groupId`} exact component={(extra) => (
        <Workspace datasetType="withGroup" componentType="viewList"
					role="items" {...props}
				>
          <SimpleList
            queryProps={{
              query       : props.queryList,
							queryParams : { id: extra.match.params.groupId },
							middleWare	:	function(data) {
								return {
									queryData: data.list,
									extraData: {id: data.id, name: data.name}
								}
							}
            }}
            label={props.labelListName}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/new`} exact component={() => (
        <Workspace datasetType="withGroup" componentType="newItem" {...props}>
          <NewRecord
            queryProps = {{
              mutation    : props.mutateAdd,
              update      : props.queryList,
              updateParams: {},
            }}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/items/:id`} exact component={(extra) => (
        <Workspace datasetType="withGroup" componentType="viewItem" {...props}>
          <ViewRecord
            queryProps = {{
      				query			    : queryItem,
      				mutation      : mutateEdit,
              queryParams   : { id: extra.match.params.id },
      				update        : queryList,
              updateParams  : {}
            }}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/items/:id/delete`} exact component={(extra) => (
        <Workspace datasetType="withGroup" componentType="deleteItem" {...props}>
          <DeleteRecord
            queryProps = {{
      				query			    : queryItem,
      				mutation      : mutateDel,
              queryParams   : { id: extra.match.params.id },
      				update		    : queryList,
              updateParams  : {}
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

export default DatasetWithGroup

// <Switch>
// 	<Route path={baseURL} exact component={() => (
// 		<Workspace>
// 			<ViewList {...props}>
// 				<SimpleList
// 					type='groups'
// 					queryProps={{
// 						query       : props.groupParams.queryList,
// 						queryParams : {}
// 					}}
// 					label={props.groupParams.labelListName}
// 				/>
// 				<SimpleList
// 					type='items'
// 					queryProps={{
// 						query       : props.queryList,
// 						queryParams : {}
// 					}}
// 					label={props.labelListName}
// 				/>
// 			</ViewList>
// 		</Workspace>
// 	)}/>
// 	<Route path={`${baseURL}*`} exact component={() => (
// 		<Redirect to={baseURL} />
// 	)}/>
// </Switch>
