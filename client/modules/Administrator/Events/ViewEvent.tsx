import React, { Component, Fragment } from 'react'
import { cloneDeep } from 'lodash'
import moment from 'moment'

import ViewGraphQL   from '../../../database/components/ViewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Grid           from '@material-ui/core/Grid'
import Divider        from '@material-ui/core/Divider'
import Button         from '@material-ui/core/Button'
import RefreshIcon    from '@material-ui/icons/Refresh'


import TextView     from '../../../layouts/Admin/components/TextView'
import SimpleList   from '../../../layouts/Admin/components/SimpleList.tsx'

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
  match: {
    url           : string,
  },
  history: {
    replace       : (url:string) => any,
  },
  queryData       : any,
}

const NewEvent = (props) => (
  <ViewGraphQL queryProps={props.queryProps}>
    <BaseComponent {...props} />
  </ViewGraphQL>
)

class BaseComponent extends Component<ComponentProps> {

  componentDidMount() {
    const { extraAction, queryData } = this.props

    setTimeout(() => {
			extraAction && extraAction(queryData)
		}, 50)
  }

  render() {
    const { classes, queryProps, queryData } = this.props

    return (
      <Fragment>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <TextView
              label={'Наименование'}
              value={queryData.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextView
              label='Дата с'
              value={moment.unix(queryData.dateStart/1000).format('DD.MM HH:mm')}
            />
            <TextView
              label='по'
              value={moment.unix(queryData.dateEnd/1000).format('DD.MM HH:mm')}
            />
            <TextView
              label={'Время (мин)'}
              value={queryData.time}
            />
          </Grid>
          <Grid item xs={12}>
            <TextView
              label={'Регион'}
              value={queryData.region.name}
            />
            <TextView
              label={'Группа'}
              value={queryData.group.name}
            />
          </Grid>
        </Grid>
        <Divider/>
        <SimpleList
          queryProps={{
            ...queryProps,
            middleWare	:	(data) => ({
              queryData	: data.items ? data.items.map(item => ({
                ...item
              })) : [],
            })
          }}
          label={'Вопросы'}
          formatListRow={(item) => ({
            primary		: item.value,
            secondary	: item.variants.map((variant, index) => (
              (variant.mark === true ?
                <span key={index} style={{fontWeight: 'bold'}}>
                  {`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
                </span>
              :
                <span key={index}>
                  {`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
                </span>
              )
            ))
          })}
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(NewEvent)
