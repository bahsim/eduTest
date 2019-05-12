import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Workspace  from '../Workspace/Workspace.tsx'

import SimpleList   from '../../../../components/common/SimpleList.tsx'
import NewRecord    from '../../../../components/common/NewRecord.tsx'
import ViewRecord   from '../../../../components/common/ViewRecord.tsx'
import DeleteRecord from '../../../../components/common/DeleteRecord.tsx'

import ViewList	  from './DatasetWithGroup/ViewList.tsx'

import NewItem 		from './DatasetOneLevel/NewItem.tsx'
import ViewItem 	from './DatasetOneLevel/ViewItem.tsx'
import DeleteItem	from './DatasetOneLevel/DeleteItem.tsx'

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
        <Workspace>
          <ViewList {...props}>
            <SimpleList
              type='groups'
              queryProps={{
                query       : props.groupParams.queryList,
                queryParams : {}
              }}
              label={props.groupParams.labelListName}
            />
            <SimpleList
              type='items'
              queryProps={{
                query       : props.queryList,
                queryParams : {}
              }}
              label={props.labelListName}
            />
          </ViewList>
        </Workspace>
      )}/>
      <Route path={`${baseURL}/new`} exact component={() => (
        <Workspace>
          <NewItem {...props}>
            <NewRecord
              queryProps = {{
                mutation    : props.mutateAdd,
                update      : props.queryList,
                updateParams: {},
              }}
            />
          </NewItem>
        </Workspace>
      )}/>
      <Route path={`${baseURL}/items/:id`} exact component={(extra) => (
        <Workspace>
          <ViewItem {...props} itemId={extra.match.params.id}>
            <ViewRecord
              queryProps = {{
        				query			    : queryItem,
        				mutation      : mutateEdit,
                queryParams   : { id: extra.match.params.id },
        				update        : queryList,
                updateParams  : {}
              }}
            />
          </ViewItem>
        </Workspace>
      )}/>
      <Route path={`${baseURL}/items/:id/delete`} exact component={(extra) => (
        <Workspace>
          <DeleteItem {...props} itemId={extra.match.params.id}>
            <DeleteRecord
              queryProps = {{
        				query			    : queryItem,
        				mutation      : mutateDel,
                queryParams   : { id: extra.match.params.id },
        				update		    : queryList,
                updateParams  : {}
              }}
            />
          </DeleteItem>
        </Workspace>
      )}/>
			<Route path={`${baseURL}*`} exact component={() => (
				<Redirect to={baseURL} />
			)}/>
		</Switch>
	)
}

export default DatasetWithGroup
