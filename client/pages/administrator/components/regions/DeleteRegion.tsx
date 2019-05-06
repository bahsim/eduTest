import React, { Component, FunctionComponent } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation, Query } from "react-apollo";

import DeleteGraphQL from '../../../common/hoc/DeleteGraphQL'
import { MUTATE_DELETE_REGION } from '../../../../database/mutations'
import { QUERY_REGIONS, QUERY_REGION } from '../../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const styles = theme => ({
	button: {
    margin			: theme.spacing.unit,
  },
	title: {
    margin			: theme.spacing.unit,
		marginBottom: theme.spacing.unit*3,
	},
})

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_BACK 	= panelLink('/admin/regions', ArrowBackIcon, 'Назад')

const BREADCRUMBS_REGIONS	= 'Регионы'
const BREADCRUMBS_DEL_REGION = 'Удаление'

const LABEL_DELETE 	= 'Удалить'

interface DeleteRegionProps {
	classes: {
    button	: object,
    title   : object,
  },
  setPanel      : (PanelArray) => any,
  setBreadcrumbs: (BreadcrumbsArray) => any,
  queryProps    : {
    queryParams : {
      id  : string,
    }
  },
  queryData     : any,
  history       : { replace: (url: string) => any},
  action        : (args: { variables: { id: string }}) => any,
}

class DeleteRegion extends Component<DeleteRegionProps> {
	state = {
		id: '',
	}

	componentDidMount() {
		const { setPanel, queryData, setBreadcrumbs } = this.props
		const { id } = this.props.queryProps.queryParams

		const panel = [{...PANEL_BACK}]
		panel[0].link += `/${id}`
		setPanel(panel)

		setBreadcrumbs([BREADCRUMBS_REGIONS, queryData.name, BREADCRUMBS_DEL_REGION])

		this.setState({ id })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { history, action } = this.props
		const { id } = this.state

		action({ variables: { id } })
			.then(() => history.replace('/admin/regions'))
	}

	render() {
		const { classes, queryData } = this.props
		const { id } = this.state

		return (
			<div>
				<Typography  variant="h6" color="inherit" className={classes.title}>
					{queryData.name}
				</Typography>
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					className={classes.button}
					onClick={this.handleSubmit}
				>
					{LABEL_DELETE}
				</Button>
			</div>
		)
	}
}

const DeleteRegionGQL =  (
	DeleteGraphQL(
		withStyles(styles)(
			DeleteRegion
		)
	)
)

interface CoverProps {
  match: {
    params: {
      id: string,
    }
  }
}

const DeleteRegionCover: FunctionComponent<CoverProps> = (props) => {

	const queryProps = {
		query			: QUERY_REGION,
		mutation	: MUTATE_DELETE_REGION,
		update		: QUERY_REGIONS,
		queryParams: {
			id: props.match.params.id
		}
	}

	return <DeleteRegionGQL {...props} queryProps={queryProps} />
}

export default withRouter(DeleteRegionCover)
