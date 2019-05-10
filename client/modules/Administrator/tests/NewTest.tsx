import React from 'react'

import { MUTATE_ADD_TEST } from '../../../database/mutations'
import { QUERY_TESTS } from '../../../database/queries'

import NewRecord from '../../../layouts/Admin/PrimaryDataset/components/NewRecord.tsx'

const params = {
  linkBack    : '/admin/tests',
  breadcrumbs : [ 'Тесты', 'Новый тест' ],
  queryProps: {
    mutation	: MUTATE_ADD_TEST,
    update		: QUERY_TESTS,
  },
}

export default (props) => <NewRecord {...params} {...props} />
