import AddIcon 			  from '@material-ui/icons/Add'
import PageviewIcon   from '@material-ui/icons/Pageview'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import DeleteIcon     from '@material-ui/icons/DeleteForever'

const BREADCRUMBS_DEL_TEST  = 'Удаление'

const LABEL_BACK    = 'Назад'
const LABEL_ADD     = 'Добавить'
const LABEL_DELETE  = 'Удалить'
const LABEL_OPEN    = 'Открыть'

const button = (icon, label, link) => ({ link, icon, label })

export default class DatasetOneLevel {
  constructor({setState, getState, props, followLink}) {
    this.setState   = setState
    this.getState   = getState
    this.props      = props
    this.followLink = followLink
  }

  putPanelContentDefault = () => {
    const { componentType, baseURL, labelName, labelNew } = this.props

    let panelContent = [], breadcrumbsContent = []

    switch (componentType) {
      case 'viewList':
        breadcrumbsContent.push(labelName)
        panelContent.push(button(AddIcon, LABEL_ADD, `${baseURL}/new`))
        break
      case 'newItem':
        breadcrumbsContent.push(labelName, labelNew)
        panelContent.push(button(ArrowBackIcon, LABEL_BACK, baseURL))
        break
    }

    this.setState({panelContent, breadcrumbsContent})
  }

  handleMainAction = (...args) => {
    const { componentType, baseURL, labelName } = this.props

    switch (componentType) {
      case 'viewList': {
        const breadcrumbsContent = [labelName, args[0].name]
        const panelContent = [
          button(AddIcon, LABEL_ADD, `${baseURL}/new`),
          button(PageviewIcon, LABEL_OPEN, `${baseURL}/items/${args[0].id}`),
        ]
        this.setState({panelContent, breadcrumbsContent})
        break
      }
      case 'newItem':
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

  handleSecondAction = (...args) => {
    const { componentType, baseURL } = this.props

    switch (componentType) {
      case 'viewList':
        this.followLink(button(`${baseURL}/items/${args[0].id}`))
        break
    }
  }

  handleExtraAction = (...args) => {
    const { componentType, baseURL, labelName } = this.props

    switch (componentType) {
      case 'viewList': {
        const { current } = this.getState('routeQueryParams')
        if (current) {
          const item = args[1].find((item) => item.id === current)
          if (item) {
            const breadcrumbsContent = [labelName, item.name]
            const panelContent = [
              button(AddIcon, LABEL_ADD, `${baseURL}/new`),
              button(PageviewIcon, LABEL_OPEN, `${baseURL}/items/${item.id}`),
            ]
            this.setState({ panelContent, breadcrumbsContent})
          }
        }
        break
      }
      case 'viewItem': {
        const breadcrumbsContent = [ labelName, args[0].name ]
        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${args[0].id}`),
          button(DeleteIcon, LABEL_DELETE, `${baseURL}/items/${args[0].id}/delete`),
    		]
        this.setState({ panelContent, breadcrumbsContent})
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
