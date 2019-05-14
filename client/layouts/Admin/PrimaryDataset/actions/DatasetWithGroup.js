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
    const { componentType, role, baseURL, labelName } = this.props

    let panelContent = [], breadcrumbsContent = []

    switch (`${componentType}-${role}`) {
      case 'viewList-groups':
        breadcrumbsContent.push(labelName)
        break
      case 'viewList-items':
        const { groupId } = this.props.match.params
        breadcrumbsContent.push(labelName)
        panelContent.push(
          button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${groupId}`),
        )
        break
    }

    this.setState({panelContent, breadcrumbsContent})
  }

  handleMainAction = (...args) => {
    const { componentType, role, baseURL, labelName } = this.props

    switch (`${componentType}-${role}`) {
      case 'viewList-groups':
        this.followLink(`${baseURL}/groups/${args[0]}`)
        break
      case 'viewList-items': {
        const { groupId } = this.props.match.params
        const breadcrumbsContent = [labelName, this.state.groupName, args[1]]
        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${groupId}`),
          button(PageviewIcon, LABEL_OPEN, `${baseURL}/group/${groupId}/items/${args[0]}`),
    		]
        this.setState({panelContent, breadcrumbsContent})
        break
      }
    }
  }

  handleSecondAction = (...args) => {}

  handleExtraAction = (...args) => {
    const { componentType, role, baseURL, labelName } = this.props

    switch (`${componentType}-${role}`) {
      case 'withGroup-viewList-items':
        const breadcrumbsContent = [ labelName, args[0].name ]
        const panelContent = [
          button(ArrowBackIcon, LABEL_BACK, `${baseURL}?current=${args[0].id}`),
        ]
        const groupName = args[0].name
        this.setState({ panelContent, breadcrumbsContent, groupName })
        break
    }
  }
}
