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
    const { componentType, role, labelName } = this.props

    switch (`${componentType}-${role}`) {
      case 'viewList-groups': {
        const breadcrumbsContent = [labelName]
        this.setState({ breadcrumbsContent })
        break
      }
    }

  }

  handleMainAction = (...args) => {
    const { componentType, role, baseURL, labelName } = this.props

    switch (`${componentType}-${role}`) {
      case 'viewList-groups':
        this.followLink(`${baseURL}/groups/${args[0].id}`)
        break
      case 'viewList-items': {
        const { groupId } = this.props.match.params
        const breadcrumbsContent = [labelName, args[0].parentName, args[0].name]
        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${groupId}`),
          button(AddIcon, LABEL_ADD, `${baseURL}/groups/${groupId}/new`),
          button(PageviewIcon, LABEL_OPEN, `${baseURL}/groups/${groupId}/items/${args[0].id}`),
    		]
        this.setState({panelContent, breadcrumbsContent})
        break
      }
    }

    switch (componentType) {
      case 'newItem': {
        const { groupId } = this.props.match.params
        this.followLink(`${baseURL}/groups/${groupId}?current=${args[0].id}`)
        break
      }
      case 'viewItem': {
        const breadcrumbsContent = [labelName, args[0].parent.name, args[0].name]
        this.setState({ breadcrumbsContent })
        break
      }
      case 'deleteItem': {
        const { groupId } = this.props.match.params
        this.followLink(`${baseURL}/groups/${groupId}`)
        break
      }
    }
  }

  handleSecondAction = (...args) => {
    const { componentType, role, baseURL } = this.props

    switch (`${componentType}-${role}`) {
      case 'viewList-items': {
        this.followLink(
          `${baseURL}/groups/${args[0].parentId}/items/${args[0].id}`
        )
        break
      }
    }
  }

  handleExtraAction = (...args) => {
    const { componentType, role, baseURL, labelNew, labelName } = this.props

    switch (`${componentType}-${role}`) {
      case 'viewList-items': {
        const { current } = this.getState('routeQueryParams')
        if (current) {
          const item = args[1].find((item) => item.id === current)
          if (item) {
            const breadcrumbsContent = [labelName, args[0].name, item.name]
            const panelContent = [
              button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${args[0].id}`),
              button(AddIcon, LABEL_ADD, `${baseURL}/groups/${args[0].id}/new`),
              button(PageviewIcon, LABEL_OPEN, `${baseURL}/groups/${args[0].id}/items/${item.id}`),
        		]
            this.setState({ panelContent, breadcrumbsContent})
          }
        } else {
          const breadcrumbsContent = [ labelName, args[0].name ]
          const panelContent = [
            button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${args[0].id}`),
            button(AddIcon, LABEL_ADD, `${baseURL}/groups/${args[0].id}/new`),
          ]
          const groupName = args[0].name
          this.setState({ panelContent, breadcrumbsContent })
        }
        break
      }
    }

    switch (componentType) {
      case 'newItem': {
        const { groupId, id } = this.props.match.params

        const breadcrumbsContent = [labelName, args[0].name, labelNew]

        const linkBack    = `${baseURL}/groups/${groupId}`
        const panelContent = [ button(ArrowBackIcon, LABEL_BACK, linkBack) ]

        this.setState({ panelContent, breadcrumbsContent })
        break
      }
      case 'viewItem': {
        const { groupId, id } = this.props.match.params

        const breadcrumbsContent = [labelName, args[0].parent.name, args[0].name]

        const linkBack    = `${baseURL}/groups/${groupId}?current=${id}`
        const linkDelete  = `${baseURL}/groups/${groupId}/items/${id}/delete`

        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, linkBack),
          button(DeleteIcon, LABEL_DELETE, linkDelete),
        ]
        this.setState({ panelContent, breadcrumbsContent })
        break
      }
      case 'deleteItem': {
        const { groupId, id } = this.props.match.params

        const breadcrumbsContent = [
          labelName, args[0].parent.name, args[0].name, LABEL_DELETE
        ]

        const linkBack    = `${baseURL}/groups/${groupId}/items/${id}`
        const panelContent = [ button(ArrowBackIcon, LABEL_BACK, linkBack) ]

        this.setState({ panelContent, breadcrumbsContent })
        break
      }
    }
  }
}
