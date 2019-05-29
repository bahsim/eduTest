import { cloneDeep } from 'lodash'
import React, { Component, Fragment } from 'react'

import SimpleSelect from '../../../layouts/Admin/components/SimpleSelect.tsx'

interface ComponentProps {
  action  : (args: { variables: { name } }) => any,
  onClick : (data: any) => any,
  region  : any,
  group   : any,
}

interface ComponentState {
  regionId  : string,
  groupId   : string,
}

class FilterEvents extends Component<ComponentProps> {

  state = {
    refresh   : false,
    regionId  : '',
    groupId   : '',
  }

  handleAction = (value, role) => {
    this.setState({[role]: value}, () => {
      this.props.onClick()
    })
  }

  render() {
    const { regionId } = this.state
    const { region } = this.props

    const group = cloneDeep(this.props.group)
    group.queryProps.queryParams = { parentId: regionId }

    return (
      <Fragment>
        <SimpleSelect
          onClick={(value) => this.handleAction(value, 'regionId')}
          {...region}
        />
        {regionId !=='' &&
          <SimpleSelect
            onClick={(value) => this.handleAction(value, 'groupId')}
            {...group}
          />
        }
      </Fragment>
    )
  }
}

export default FilterEvents
