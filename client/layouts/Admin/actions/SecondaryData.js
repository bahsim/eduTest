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
        panelContent.push(button(AddIcon, LABEL_ADD, `${baseURL}/new`))
        breadcrumbsContent.push(labelName)
        break
      }
      case 'filter-history': {
        breadcrumbsContent.push(labelName)
        break
      }
    }
    switch (componentType) {
      case 'newItem':
        const url = `${baseURL}${this.getState('routeQueryString')}`
        panelContent.push(button(ArrowBackIcon, LABEL_BACK, url))
        breadcrumbsContent.push(labelName, labelNew)
        break
    }

    this.setState({panelContent, breadcrumbsContent})
  }

  handleMainAction = (...args) => {
    const { componentType, baseURL, labelName } = this.props

    switch (componentType) {
      case 'filter':
        this.followLink(`${baseURL}${args[0]}`)
        break
      case 'viewList':
        this.followLink(`${baseURL}/items/${args[0].id}`)
        break
      case 'newItem':
        console.log(args[0])
        const urlQueryParams = (
          `?regionId=${args[0].region.id}&groupId=${args[0].group.id}&current=${args[0].id}`
        )
        this.followLink(`${baseURL}${urlQueryParams}`)
        break
      case 'deleteItem':
        this.followLink(baseURL)
        break
      case 'viewItem': {
        const breadcrumbsContent = [labelName, args[0].name]
        const panelContent = this.getState('panelContent')
        this.setState({panelContent, breadcrumbsContent})
        break
      }
    }
  }

  handleExtraAction = (...args) => {
    const { role, componentType, baseURL, labelName } = this.props

    // switch (`${componentType}-${role}`) {
    switch (componentType) {
      case 'viewItem': {
        const breadcrumbsContent = [ labelName, args[0].name ]
        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${args[0].id}`),
          button(DeleteIcon, LABEL_DELETE, `${baseURL}/items/${args[0].id}/delete`),
    		]
        const contentData = { ownerId : args[0].id }
        this.setState({ panelContent, breadcrumbsContent, contentData })
        break
      }
      case 'deleteItem': {
        const breadcrumbsContent = [ labelName, args[0].name, BREADCRUMBS_DEL_TEST ]
        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, `${baseURL}/items/${args[0].id}`)
        ]
        this.setState({ panelContent, breadcrumbsContent})
        break
      }
    }
  }
}
