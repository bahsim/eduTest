import React, { useEffect } from 'react'
import { withRouter }       from 'react-router-dom'

import NewGraphQL from '../../../database/components/NewGraphQL'
import { MUTATE_ADD_TEST } from '../../../database/mutations'
import { QUERY_TESTS } from '../../../database/queries'

import { withStyles } from '@material-ui/core/styles'
import TextField      from '@material-ui/core/TextField'
import Grid           from '@material-ui/core/Grid'
import Button         from '@material-ui/core/Button'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'

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

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_BACK 	= panelLink('/admin/tests', ArrowBackIcon, 'Назад')

const BREADCRUMBS_TESTS			= 'Тесты'
const BREADCRUMBS_NEW_TEST 	= 'Новый тест'

const LABEL_NAME 	= 'Наименование'
const LABEL_SAVE 	= 'Сохранить'

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: any, icon: any, label: any };
}
interface BreadcrumbsArray {
  length: number;
  [item: number]: string
}

interface ComponentProps {
  classes: {
    textField : object
    button    : object
  },
  setPanel      : (PanelArray) => any
  setBreadcrumbs: (BreadcrumbsArray) => any
  history       : { replace: (url: string) => any }
  action        : (args: { variables: { name } }) => any
}


const NewTest = (props) => {
	const queryProps = {
		mutation	: MUTATE_ADD_TEST,
		update		: QUERY_TESTS,
	}
  return (
    <NewGraphQL queryProps={queryProps}>
      <Component {...props} />
    </NewGraphQL>
  )
}

const Component = (props: ComponentProps) => {

  useEffect(() => {
    const panel = [{...PANEL_BACK}]
		props.setPanel(panel)

		props.setBreadcrumbs([ BREADCRUMBS_TESTS, BREADCRUMBS_NEW_TEST ])
  }, [])

  const handleSubmit = (e) => {
		e.preventDefault()

		const name = e.target.name.value.trim()
		if (name === '') return

		props.action({ variables: { name }})
			.then(() => props.history.replace('/admin/tests'))
	}

	return (
		<Grid container>
			<Grid item xs={6}>
				<form
					onSubmit={handleSubmit}
					noValidate
					autoComplete="off"
				>
					<TextField
						label={LABEL_NAME}
						name="name"
						className={props.classes.textField}
						margin="normal"
						autoFocus
					/>
					<Button
						type="submit"
						variant="contained"
						className={props.classes.button}
						color="primary"
					>
						{LABEL_SAVE}
					</Button>
				</form>
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(withRouter(NewTest))
