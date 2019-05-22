import React, { useState } from 'react'

import NewGraphQL from '../../../database/components/NewGraphQL'

import TestItemInput from './TestItemInput.tsx'

interface BaseComponentProps {
  action          : (args: { variables: { name } }) => any,
  onClick         : (data: any) => any,
  queryProps: {
    mutation      : any,
    mutationParams: any,
  },
}

const NewTestItem = (props) => (
  <NewGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </NewGraphQL>
)

const BaseComponent = (props: BaseComponentProps) => (
  <TestItemInput
    question={''}
    variants={[{value: '', mark: false}]}
    onClick={(data) => {
      const variables = { ...data, ...props.queryProps.mutationParams}
      props.action({ variables })
  			.then(({ data }) => props.onClick(data[props.queryProps.mutation.name]))
  	}}
  />
)

export default NewTestItem
