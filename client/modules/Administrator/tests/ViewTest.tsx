import React          from 'react'
import { withRouter } from 'react-router-dom'

import { MUTATE_EDIT_TEST } from '../../../database/mutations'
import { QUERY_TEST } from '../../../database/queries'

import ViewRecord from '../../../components/ViewRecord.tsx'

const ViewTest = (props) => {
  const params = {
    linkBack    : '/admin/tests',
    breadcrumbs : 'Тесты',
    queryProps: {
      query			: QUERY_TEST,
  		mutation	: MUTATE_EDIT_TEST,
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

export default withRouter(ViewTest)
