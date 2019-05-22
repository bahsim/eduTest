import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Workspace  from '../Workspace/Workspace.tsx'

import SimpleList   from '../../../../components/SimpleList.tsx'
import NewRecord    from '../../../../components/NewRecord.tsx'
import ViewRecord   from '../../../../components/ViewRecord.tsx'
import DeleteRecord from '../../../../components/DeleteRecord.tsx'

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
							middleWare	:	(data) => ({
								queryData	: data.list.map(item => ({
									...item, parentId: data.id, parentName: data.name
								})),
								extraData	: {id: data.id, name: data.name}
							})
            }}
            label={props.labelListName}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/groups/:groupId/new`} exact component={(extra) => (
        <Workspace datasetType="withGroup" componentType="newItem" {...props}>
          <NewRecord
            queryProps = {{
							query			    	: queryList,
							queryParams 		: { id: extra.match.params.groupId },
							middleWare			:	(data) => ({id: data.id, name: data.name}),
              mutation    		: props.mutateAdd,
							mutationParams	: {
								regionId			: extra.match.params.groupId
							},
              update      		: props.queryList,
              updateParams		: { id: extra.match.params.groupId },
							updateWare			:	(data, name)  => ({ [name] : data[name].list })
            }}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/groups/:groupId/items/:id`} exact component={(extra) => (
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
      <Route path={`${baseURL}/groups/:groupId/items/:id/delete`} exact component={(extra) => (
        <Workspace datasetType="withGroup" componentType="deleteItem" {...props}>
          <DeleteRecord
            queryProps = {{
      				query			    : queryItem,
      				mutation      : mutateDel,
              queryParams   : { id: extra.match.params.id },
      				update		    : queryList,
              updateParams  : { id: extra.match.params.groupId },
							updateWare		:	(data, name)  => ({ [name] : data[name].list })
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
