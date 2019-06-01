import React, { Component } from 'react'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import queryString from 'query-string'

import Grid         from '@material-ui/core/Grid'
import Button       from '@material-ui/core/Button'
import RefreshIcon  from '@material-ui/icons/Refresh'

import DatePicker from '../../../layouts/Admin/components/DatePicker'
import SimpleSelect from '../../../layouts/Admin/components/SimpleSelect.tsx'

interface ComponentProps {
  region          : any,
  group           : any,
  urlQueryParams  : any,
  match: {
    url           : string,
  },
  history: {
    replace       : (url:string) => any,
  }
}

interface ComponentState {
  refresh   : boolean,
  dateStart : string,
  dateEnd   : string,
  regionId  : string,
  groupId   : string,
}

const getPropValue = (props, name, defaultValue) => (
  props[name] ? props[name] : defaultValue
)

const today = moment().format('YYYY-MM-DD')

class FilterResults extends Component<ComponentProps,ComponentState> {

  state = {
    refresh   : false,
    dateStart : getPropValue(this.props.urlQueryParams, 'dateStart', today),
    dateEnd   : getPropValue(this.props.urlQueryParams, 'dateEnd', today),
    regionId  : getPropValue(this.props.urlQueryParams, 'regionId', ''),
    groupId   : getPropValue(this.props.urlQueryParams, 'groupId', ''),
  }

  componentDidMount() {
    const { dateStart, dateEnd } = this.props.urlQueryParams

    if (!dateStart || !dateEnd) {
      this.handleRefresh()
    }
  }

  handleAction = (value, role) => {
    const state = cloneDeep(this.state)

    if (role === 'regionId') {
      state.groupId = ''
    }

    if (role === 'dateStart') {
      if (value === '') return

      const date1 = (new Date(value)).getTime()
      const date2 = (new Date(state.dateEnd)).getTime()

      if (date1 > date2) {
        state.dateEnd = value
      }
    }

    if (role === 'dateEnd') {
      if (value === '') return

      const date1 = (new Date(state.dateStart)).getTime()
      const date2 = (new Date(value)).getTime()

      if (date1 > date2) {
        state.dateStart = value
      }
    }

    state.refresh = true
    state[role] = value

    this.setState(state)
  }

  handleRefresh = () => {
    const { match, history } = this.props
    const { regionId, groupId, dateStart, dateEnd } = this.state

    const query = [`dateStart=${dateStart}`, `dateEnd=${dateEnd}`]

    if (regionId !== '')  query.push(`regionId=${regionId}`)
    if (groupId !== '')   query.push(`groupId=${groupId}`)

    const queryStr = query.length > 0 ? `?${query.join('&')}` : ''

    history.replace(`${match.url}${queryStr}`)
  }

  render() {
    const { regionId, groupId, dateStart, dateEnd, refresh } = this.state
    const { region } = this.props

    const group = cloneDeep(this.props.group)
    group.queryProps.queryParams = { parentId: regionId }

    return (
      <Grid container item alignItems="center">
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

export default FilterResults
