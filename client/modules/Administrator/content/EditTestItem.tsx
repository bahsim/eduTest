import React, { Component, useEffect } from 'react'

import EditGraphQL  from '../../../database/components/EditGraphQL'

import TestItemInput from './components/TestItemInput.tsx'

interface ComponentProps {
  onClick     : (data: any) => any,
  queryProps    : {
    mutation    : { name: string }
    queryParams : { id: string },
    mutationParams : { id: string },
  },
  queryData     : any
  action        : (args: { variables: { id: string, name: string }}) => any
}

const EditTestItem = (props) => (
  <EditGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </EditGraphQL>
)

const BaseComponent = (props: ComponentProps) => (
  <TestItemInput
    question={props.queryData.value}
    variants={props.queryData.variants.map((el) => (
      { value: el.value, mark: el.mark }
    ))}
    onClick={(data) => {
      const variables = { ...data, ...props.queryProps.mutationParams}
      props.action({ variables })
  			.then(({ data }) => props.onClick(data[props.queryProps.mutation.name]))
  	}}
  />
)

export default EditTestItem
