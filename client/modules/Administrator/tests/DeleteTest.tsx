import React          from 'react'
import { withRouter } from 'react-router-dom'

import { MUTATE_DELETE_TEST } from '../../../database/mutations'
import { QUERY_TESTS, QUERY_TEST } from '../../../database/queries'

import DeleteRecord from '../../../layouts/Admin/PrimaryDataset/components/DeleteRecord.tsx'

const ViewTest = (props) => {
  const params = {
    linkBack    : '/admin/tests',
		breadcrumbs : 'Тесты',
    queryProps: {
			query			: QUERY_TEST,
			mutation	: MUTATE_DELETE_TEST,
			update		: QUERY_TESTS,
			queryParams: {
				id	: props.match.params.id
			}
    },
  }

  return <DeleteRecord {...props} {...params} />
}

export default withRouter(ViewTest)
