import { cloneDeep } from 'lodash'
import React, { Component } from 'react'

import Grid         from '@material-ui/core/Grid'
import Button       from '@material-ui/core/Button'
import RefreshIcon  from '@material-ui/icons/Refresh'

import SimpleSelect from '../../../layouts/Admin/components/SimpleSelect.tsx'

interface ComponentProps {
  region  : any,
  group   : any,
}

interface ComponentState {
  regionId  : string,
  groupId   : string,
}

const getPropValue = (props, name, defaultValue) => (
  props[name] ? props[name] : defaultValue
)

class FilterEvents extends Component<ComponentProps> {

  state = {
    refresh   : false,
    regionId  : getPropValue(this.props.urlQueryParams, 'regionId', ''),
    groupId   : getPropValue(this.props.urlQueryParams, 'groupId', ''),
  }

  handleAction = (value, role) => {
    const state = cloneDeep(this.state)

    state[role] = value
    state.refresh = true

    if (role === 'regionId') {
      state.groupId = ''
    }

    this.setState(state)
  }

  handleRefresh = () => {
    const { match, history } = this.props
    const { regionId, groupId } = this.state

    const query = []

    if (regionId !== '')  query.push(`regionId=${regionId}`)
    if (groupId !== '')   query.push(`groupId=${groupId}`)

    const queryStr = query.length > 0 ? `?${query.join('&')}` : ''

    history.replace(`${match.url}${queryStr}`)
  }

  render() {
    const { regionId, groupId, refresh } = this.state
    const { region } = this.props

    const group = cloneDeep(this.props.group)
    group.queryProps.queryParams = { parentId: regionId }

    return (
      <Grid container item alignItems="center">
        <SimpleSelect
          onClick={(value) => this.handleAction(value, 'regionId')}
          currentItem={regionId}
          {...region}
        />
        {regionId !=='' &&
          <SimpleSelect
            onClick={(value) => this.handleAction(value, 'groupId')}
            currentItem={groupId}
            {...group}
          />
        }
        {refresh &&
          <Button onClick={() => this.handleRefresh()}>
            <RefreshIcon/>
            {'Обновить'}
          </Button>
        }
      </Grid>
    )
  }
}

export default FilterEvents
