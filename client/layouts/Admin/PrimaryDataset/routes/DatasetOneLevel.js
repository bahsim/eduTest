import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Workspace  from '../Workspace/Workspace.tsx'

import SimpleList   from '../../../../components/common/SimpleList.tsx'
import NewRecord    from '../../../../components/common/NewRecord.tsx'
import ViewRecord   from '../../../../components/common/ViewRecord.tsx'
import DeleteRecord from '../../../../components/common/DeleteRecord.tsx'

const DatasetOneLevel = (props) => {
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
        <Workspace datasetType="oneLevel" componentType="viewList" {...props}>
          <SimpleList
            queryProps={{
              query       : props.queryList,
              queryParams : {}
            }}
            label={props.labelListName}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/new`} exact component={() => (
        <Workspace datasetType="oneLevel" componentType="newItem" {...props}>
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
        <Workspace datasetType="oneLevel" componentType="viewItem" {...props}>
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
        <Workspace datasetType="oneLevel" componentType="deleteItem" {...props}>
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

export default DatasetOneLevel
