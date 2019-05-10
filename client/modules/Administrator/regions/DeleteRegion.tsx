import React          from 'react'
import { withRouter } from 'react-router-dom'

import { MUTATE_DELETE_REGION } from '../../../database/mutations'
import { QUERY_REGIONS, QUERY_REGION } from '../../../database/queries'

import DeleteRecord from '../../../layouts/Admin/PrimaryDataset/components/DeleteRecord.tsx'

const ViewTest = (props) => {
  const params = {
    linkBack    : '/admin/regions',
		breadcrumbs : 'Регионы',
    queryProps: {
			query			: QUERY_REGION,
			mutation	: MUTATE_DELETE_REGION,
			update		: QUERY_REGIONS,
			queryParams: {
				id	: props.match.params.id
			}
    },
  }

  return <DeleteRecord {...props} {...params} />
}

export default withRouter(ViewTest)
