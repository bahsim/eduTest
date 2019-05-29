import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

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

	return (
		<Switch>
      <Route path={baseURL} exact component={() => (
        <Workspace datasetType="secondary" componentType="filter" {...props}>
          <Filter
						{...props.filterParams}
					/>
        </Workspace>
      )}/>
      <Route path={`${baseURL}/new`} exact component={() => (
        <Workspace datasetType="secondary" componentType="newItem" {...props}>
          <NewRecord
            queryProps = {{
              mutation    : mutateAdd,
              update      : queryList,
              updateParams: {},
            }}
          />
        </Workspace>
      )}/>
      <Route path={`${baseURL}/items/:id`} exact component={(extra) => (
        <Workspace datasetType="secondary" componentType="viewItem" {...props}>
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
        <Workspace datasetType="secondary" componentType="deleteItem" {...props}>
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
