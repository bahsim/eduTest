import React from 'react'

import { QUERY_REGIONS } from '../../../database/queries'

import ViewList from '../../../layouts/Admin/PrimaryDataset/components/ViewList.tsx'

const GroupsList = (props) => {
	const params = {
    linkBack    : '/admin/regions',
		breadcrumbs : 'Регионы',
    queryProps: {
      query				: QUERY_REGIONS,
		  queryParams	: {}
	  },
  }
	return <ViewList {...props} {...params} />
}

export default GroupsList
