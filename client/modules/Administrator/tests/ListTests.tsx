import React from 'react'

import { QUERY_TESTS } from '../../../database/queries'

import ViewList from '../../../layouts/Admin/PrimaryDataset/components/ViewList.tsx'

const GroupsList = (props) => {
	const params = {
    linkBack    : '/admin/tests',
		breadcrumbs : 'Тесты',
    queryProps: {
      query				: QUERY_TESTS,
		  queryParams	: {}
	  },
  }
	return <ViewList {...props} {...params} />
}

export default GroupsList
