import React from 'react'

import { MUTATE_ADD_REGION } from '../../../database/mutations'
import { QUERY_REGIONS } from '../../../database/queries'

import NewRecord from '../../../components/NewRecord.tsx'

const params = {
  linkBack    : '/admin/regions',
  breadcrumbs : [ 'Регионы', 'Новый регион' ],
  queryProps: {
    mutation	: MUTATE_ADD_REGION,
    update		: QUERY_REGIONS,
  },
}

export default (props) => <NewRecord {...params} {...props} />
