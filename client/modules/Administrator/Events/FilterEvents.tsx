import React, { Component } from 'react'

interface ComponentProps {
  action          : (args: { variables: { name } }) => any,
  onClick         : (data: any) => any,
  queryProps: {
    mutation      : any,
    mutationParams: any,
  },
}

class FilterEvents extends Component<ComponentProps> {

  render() {
    return (
      <div>FilterEvents</div>
    )
  }
}

export default FilterEvents
