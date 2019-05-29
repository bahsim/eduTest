import React, { Component, Fragment } from 'react'
import { cloneDeep } from 'lodash'
import moment from 'moment'

import DatePicker from '../../../layouts/Admin/components/DatePicker'
import SimpleSelect from '../../../layouts/Admin/components/SimpleSelect.tsx'

interface ComponentProps {
  action  : (args: { variables: { name } }) => any,
  onClick : (data: any) => any,
  region  : any,
  group   : any,
}

interface ComponentState {
  refresh   : boolean,
  dateStart : string,
  dateEnd   : string,
  regionId  : string,
  groupId   : string,
}

class FilterResults extends Component<ComponentProps,ComponentState> {

  state = {
    refresh   : false,
    dateStart : moment().format('YYYY-MM-DD'),
    dateEnd   : moment().format('YYYY-MM-DD'),
    regionId  : '',
    groupId   : '',
  }

  handleAction = (value, role) => {
    const state = cloneDeep(this.state)

    state[role]   = value

    if (role === 'dateStart') {
      const date1 = (new Date(value)).getTime()
      const date2 = (new Date(state.dateEnd)).getTime()

      if (date1 > date2) {
        state.dateEnd = value
      }
    }

    if (role === 'dateEnd') {
      const date1 = (new Date(state.dateStart)).getTime()
      const date2 = (new Date(value)).getTime()

      if (date1 > date2) {
        state.dateStart = value
      }
    }

    this.setState(state, () => {
      this.props.onClick()
    })
  }

  render() {
    const { regionId, dateStart, dateEnd, refresh } = this.state
    const { classes, region } = this.props

    const group = cloneDeep(this.props.group)
    group.queryProps.queryParams = { parentId: regionId }

    return (
      <Fragment>
        <DatePicker
          label='Дата с'
          value={dateStart}
          onChange={(value) => this.handleAction(value,'dateStart')}
        />
        <DatePicker
          label='по'
          value={dateEnd}
          onChange={(value) => this.handleAction(value, 'dateEnd')}
        />
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

export default FilterResults
