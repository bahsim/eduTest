import React, { Component, Fragment } from 'react'
import queryString from 'query-string'
import { cloneDeep } from 'lodash'
import moment from 'moment'

import NewGraphQL   from '../../../database/components/NewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Grid           from '@material-ui/core/Grid'
import Divider        from '@material-ui/core/Divider'
import Button         from '@material-ui/core/Button'
import RefreshIcon    from '@material-ui/icons/Refresh'

import DateTimePicker from '../../../layouts/Admin/components/DateTimePicker'
import SimpleSelect   from '../../../layouts/Admin/components/SimpleSelect.tsx'
import NumberInput    from '../../../layouts/Admin/components/NumberInput'

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
	button: {
    margin      : theme.spacing.unit,
  },
})

const LABEL_SAVE 	= 'Сохранить'

interface ComponentProps {
  classes: {
    button        : object,
  },
  test            : any,
  region          : any,
  group           : any,
  urlQueryParams  : any,
  match: {
    url           : string,
  },
  history: {
    replace       : (url:string) => any,
  },
  location: {
    search        : string,
  }
  queryProps: {
    queryParams   : string,
    mutation: {
      name        : string,
    }
  },
  onClick         : (data: any) => any,
  action          : (data: any) => any,
}

interface ComponentState {
  regionId      : string,
  groupId       : string,
  testId        : string,
  dateStart     : string,
  dateEnd       : string,
  time          : number,
}

const getPropValue = (props, name, defaultValue) => (
  props[name] ? props[name] : defaultValue
)

const today = moment().format('YYYY-MM-DDTHH:mm')

const NewEvent = (props) => (
  <NewGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </NewGraphQL>
)

class BaseComponent extends Component<ComponentProps,ComponentState> {

  state = {
    testId        : getPropValue(this.props.urlQueryParams, 'testId', ''),
    dateStart     : today,
    dateEnd       : today,
    time          : 0,
    regionId      : getPropValue(this.props.urlQueryParams, 'regionId', ''),
    groupId       : getPropValue(this.props.urlQueryParams, 'groupId', ''),
    complete      : false,
  }

  handleAction = (value, role) => {
    const { match, history, location } = this.props
    const routeQueryParams = queryString.parse(this.props.location.search)

    if (role === 'testId') {
      routeQueryParams.testId = value
      const routeQueryString = Object.keys(routeQueryParams).map(key => (
        `${key}=${routeQueryParams[key]}`
      )).join('&')
      history.replace(`${match.url}?${routeQueryString}`)
    }

    if (role === 'regionId') {
      routeQueryParams.regionId = value
      if (routeQueryParams.groupId) {
        delete routeQueryParams.groupId
      }
      const routeQueryString = Object.keys(routeQueryParams).map(key => (
        `${key}=${routeQueryParams[key]}`
      )).join('&')
      history.replace(`${match.url}?${routeQueryString}`)
    }

    if (role === 'groupId') {
      routeQueryParams.groupId = value
      const routeQueryString = Object.keys(routeQueryParams).map(key => (
        `${key}=${routeQueryParams[key]}`
      )).join('&')
      history.replace(`${match.url}?${routeQueryString}`)
    }

    const state = cloneDeep(this.state)

    state[role] = value

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

    // if (role === 'regionId') {
    //   state.groupId = ''
    // }

    if (role === 'time') {
      state.time = parseInt(value)
      if (value < 0) {
        state.time = 0
      }
    }

    switch (true) {
      case state.testId === ''        : state.complete = false; break;
      case state.dateStart === ''     : state.complete = false; break;
      case state.dateEnd === ''       : state.complete = false; break;
      case state.time === 0           : state.complete = false; break;
      case state.regionId === ''      : state.complete = false; break;
      case state.groupId === ''       : state.complete = false; break;
      default                         : state.complete = true
    }

    this.setState(state)
  }

  handleOnSave = () => {
    const { complete, ...variables } = this.state

    this.props.action({ variables })
			.then(({ data }) => this.props.onClick(
        data[this.props.queryProps.mutation.name])
      )
  }

  render() {
    const { testId, regionId, groupId,
            dateStart, dateEnd, time, complete } = this.state
    const { classes, test, region } = this.props

    const group = cloneDeep(this.props.group)
    group.queryProps.queryParams = { parentId: regionId }

    return (
      <Fragment>
        <Grid container alignItems="center">
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <SimpleSelect
              onClick={(value) => this.handleAction(value, 'testId')}
              currentItem={testId}
              {...test}
            />
          </Grid>
          {testId !=='' &&
            <Fragment>
              <Grid item xs={12}>
                <DateTimePicker
                  label='Дата с'
                  value={dateStart}
                  onChange={(value) => this.handleAction(value,'dateStart')}
                />
                <DateTimePicker
                  label='по'
                  value={dateEnd}
                  onChange={(value) => this.handleAction(value, 'dateEnd')}
                />
                <NumberInput
                  label={'Время (мин)'}
                  value={time}
                  onChange={(value) => this.handleAction(value, 'time')}
                />
              </Grid>
            </Fragment>
          }
        </Grid>
        {complete &&
          <Fragment>
            <Divider/>
            <Button
        			type="submit"
        			variant="contained"
              className={classes.button}
        			color="primary"
              onClick={() => this.handleOnSave()}
        		>
        			{LABEL_SAVE}
        		</Button>
      		</Fragment>
        }
        <Divider/>
      </Fragment>
    )
  }
}

export default withStyles(styles)(NewEvent)
