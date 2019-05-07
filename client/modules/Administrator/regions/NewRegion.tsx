import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import NewGraphQL from '../../../database/components/NewGraphQL'
import { MUTATE_ADD_REGION } from '../../../database/mutations'
import { QUERY_REGIONS } from '../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
	button: {
    margin: theme.spacing.unit,
  },
})

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_BACK 	= panelLink('/admin/regions', ArrowBackIcon, 'Назад')

const BREADCRUMBS_REGIONS			= 'Регионы'
const BREADCRUMBS_NEW_REGION 	= 'Новый регион'

const LABEL_NAME 	= 'Наименование'
const LABEL_SAVE 	= 'Сохранить'

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: any, icon: any, label: any };
}
interface BreadcrumbsArray {
  length: number;
  [item: number]: string;
}

interface NewRegionProps {
  classes: {
    textField : object,
    button    : object,
  },
  setPanel      : (PanelArray) => any,
  setBreadcrumbs: (BreadcrumbsArray) => any,
  history       : { replace: (url: string) => any },
  action        : (args: { variables: { name } }) => any,
}

class NewRegion extends Component<NewRegionProps> {

	componentDidMount() {
		const { setPanel, setBreadcrumbs } = this.props

		const panel = [{...PANEL_BACK}]
		setPanel(panel)

		setBreadcrumbs([BREADCRUMBS_REGIONS, BREADCRUMBS_NEW_REGION])
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { history, action } = this.props
		const name = e.target.name.value.trim()

		if (name === '') return

		action({ variables: { name }})
			.then(() => history.replace('/admin/regions'))
	}

	render() {
		const { classes } = this.props

		return (
			<Grid container >
				<Grid item xs={6}>
					<form
						onSubmit={this.handleSubmit}
						noValidate
						autoComplete="off"
					>
						<TextField
							label={LABEL_NAME}
							name="name"
							className={classes.textField}
							margin="normal"
							autoFocus
						/>
						<Button
							type="submit"
							variant="contained"
							className={classes.button}
							color="primary"
						>
							{LABEL_SAVE}
						</Button>
					</form>
				</Grid>
			</Grid>
		);
	}
}

const NewRegionGQL =  (
	NewGraphQL(
		withStyles(styles)(
			NewRegion
		)
	)
)

const NewRegionCover = (props) => {

	const queryProps = {
		mutation	: MUTATE_ADD_REGION,
		update		: QUERY_REGIONS,
	}

	return <NewRegionGQL {...props} queryProps={queryProps} />
}

export default withRouter(NewRegionCover)
