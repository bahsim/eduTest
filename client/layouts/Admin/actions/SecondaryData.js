import { cloneDeep } from 'lodash'

import AddIcon 			  from '@material-ui/icons/Add'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import DeleteIcon     from '@material-ui/icons/DeleteForever'

const BREADCRUMBS_DEL_TEST  = 'Удаление'

const LABEL_BACK    = 'Назад'
const LABEL_ADD     = 'Добавить'
const LABEL_DELETE  = 'Удалить'
const LABEL_REFRESH = 'Обновить'

const button = (icon, label, link) => ({ link, icon, label })

export default class PrimaryDataSimple {
  constructor({setState, getState, props, followLink}) {
    this.setState   = setState
    this.getState   = getState
    this.props      = props
    this.followLink = followLink
  }

  putPanelContentDefault = () => {
    const { role, componentType, baseURL, labelName, labelNew } = this.props

    let panelContent = [], breadcrumbsContent = []

    switch (`${componentType}-${role}`) {
      case 'filter-current': {
        const url = `${baseURL}/new${this.getState('routeQueryString')}`
        panelContent.push(button(AddIcon, LABEL_ADD, url))
        breadcrumbsContent.push(labelName)
        break
      }
      case 'filter-history': {
        breadcrumbsContent.push(labelName)
        break
      }
    }
    switch (componentType) {
      case 'newItem': {
        const routeQueryParams = cloneDeep(this.getState('routeQueryParams'))
        if (routeQueryParams.testId) {
          delete routeQueryParams.testId
        }
        const routeQueryString = Object.keys(routeQueryParams).map(key => (
          `${key}=${routeQueryParams[key]}`
        )).join('&')

        const urlBack = (
          routeQueryString !== '' ? `${baseURL}?${routeQueryString}` : baseURL
        )

        panelContent.push(button(ArrowBackIcon, LABEL_BACK, urlBack))
        breadcrumbsContent.push(labelName, labelNew)
        break
      }
    }

    this.setState({panelContent, breadcrumbsContent})
  }

  handleMainAction = (...args) => {
    const { componentType, baseURL, labelName } = this.props

    switch (componentType) {
      case 'filter':
        const routeQueryString = this.getState('routeQueryString')
        this.followLink(`${baseURL}/items/${args[0].id}${routeQueryString}`)
        break
      case 'newItem': {
        const urlQueryParams = (
          `?regionId=${args[0].region.id}&groupId=${args[0].group.id}&current=${args[0].id}`
        )
        this.followLink(`${baseURL}${urlQueryParams}`)
        break
      }
      case 'deleteItem': {
        const urlQueryParams = this.getState('routeQueryString')
        this.followLink(`${baseURL}${urlQueryParams}`)
        break
      }
    }
  }

  handleExtraAction = (...args) => {
    const { componentType, baseURL, labelName } = this.props

    switch (componentType) {
      case 'viewItem':{
        const routeQueryParams = cloneDeep(this.getState('routeQueryParams'))
        routeQueryParams.current = args[0].id

        const routeQueryString = Object.keys(routeQueryParams).map(key => (
          `${key}=${routeQueryParams[key]}`
        )).join('&')

        const urlBack = `${baseURL}?${routeQueryString}`
        const urlDelete = (
          `${baseURL}/items/${args[0].id}/delete?${routeQueryString}`
        )

        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, urlBack),
          button(DeleteIcon, LABEL_DELETE, urlDelete),
        ]
        const breadcrumbsContent = [labelName, args[0].name]

        this.setState({ panelContent, breadcrumbsContent })
        break
      }
      case 'deleteItem': {
        const routeQueryString = this.getState('routeQueryString')
        const urlBack = `${baseURL}/items/${args[0].id}${routeQueryString}`

        const panelContent = [ button(ArrowBackIcon, LABEL_BACK, urlBack) ]
        const breadcrumbsContent = [ labelName, args[0].name, BREADCRUMBS_DEL_TEST ]

        this.setState({ panelContent, breadcrumbsContent})
        break
      }
    }
  }
}
