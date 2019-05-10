import React          from 'react'
import { withRouter } from 'react-router-dom'

import { MUTATE_EDIT_REGION } from '../../../database/mutations'
import { QUERY_REGION } from '../../../database/queries'

import ViewRecord from '../../../layouts/Admin/PrimaryDataset/components/ViewRecord.tsx'

const ViewRegion = (props) => {
  const params = {
    linkBack    : '/admin/regions',
    breadcrumbs : 'Регионы',
    queryProps: {
      query			: QUERY_REGION,
  		mutation	: MUTATE_EDIT_REGION,
      queryParams: {
        id: props.match.params.id
      },
    },
  }

  return (
    <ViewRecord {...props} {...params}>
      Content
    </ViewRecord>
  )
}

export default withRouter(ViewRegion)
