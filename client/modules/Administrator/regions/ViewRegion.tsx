import React, { useState, useEffect } from 'react'
import { withRouter }       from 'react-router-dom'

import EditGraphQL from '../../../database/components/EditGraphQL'
import { MUTATE_EDIT_REGION } from '../../../database/mutations'
import { QUERY_REGION } from '../../../database/queries'

import { withStyles }     from '@material-ui/core/styles'
import Typography         from '@material-ui/core/Typography'
import TextField          from '@material-ui/core/TextField'
import Grid               from '@material-ui/core/Grid'
import Button             from '@material-ui/core/Button';
import IconButton         from '@material-ui/core/IconButton'
import ArrowBackIcon      from '@material-ui/icons/ArrowBack'
import EditIcon           from '@material-ui/icons/Edit'
import DeleteForeverIcon  from '@material-ui/icons/DeleteForever'

const styles = theme => ({
  textField: {
    marginLeft  : theme.spacing.unit,
    marginRight : theme.spacing.unit,
    width       : '100%',
  },
	button: {
    margin      : theme.spacing.unit,
  },
	margin: {
    margin      : theme.spacing.unit,
  },
})

const panelLink = (link, icon, label) => ({ type: 'link', link, icon, label })

const PANEL_BACK 	= panelLink('/admin/regions', ArrowBackIcon, 'Назад')
const PANEL_DELETE 	= panelLink('/admin/regions', DeleteForeverIcon, 'Удалить регион')

const BREADCRUMBS_REGIONS	= 'Регионы'

const LABEL_NEW_NAME 	= 'Новое наименование'
const LABEL_SAVE 			= 'Сохранить'
const LABEL_CLOSE 		= 'Закрыть'

interface PanelArray {
  length: number;
  [item: number]: {type: string, link: string, icon: any, label: string }
}

interface BreadcrumbsArray {
  length: number;
  [item: number]: string;
}

interface ComponentProps {
  classes: {
    textField : object
    button    : object
    margin    : object
  },
  setPanel      : (PanelArray) => any
  setBreadcrumbs: (BreadcrumbsArray) => any
  queryProps    : {
    queryParams : {
      id  : string
    }
  },
  queryData     : any
  action        : (args: { variables: { id: string, name: string }}) => any
}

const ViewRegion = (props: any) => {
  const queryProps = {
		query			: QUERY_REGION,
		mutation	: MUTATE_EDIT_REGION,
    queryParams: {
  		id: props.match.params.id
  	}
	}
  return (
    <EditGraphQL queryProps={queryProps}>
      <Component {...props} />
    </EditGraphQL>
  )
}

const Component = (props: ComponentProps) => {

  const [editState, setEditState] = useState(false)

  useEffect(() => {
		const panel = [
			{...PANEL_BACK},
			{...PANEL_DELETE}
		]
		panel[1].link += `/${props.queryProps.queryParams.id}/delete`
		props.setPanel(panel)

		setBreadcrumbs()
  })

	const setBreadcrumbs = () => {
		props.setBreadcrumbs([BREADCRUMBS_REGIONS, props.queryData.name])
	}

	const handleSubmit = e => {
		e.preventDefault()

		const name = e.target.name.value.trim()
		const { id } = props.queryProps.queryParams

		if (name === '') return

		props.action({ variables: { id, name }})
			.then(() => {
				setEditState(false)
				setBreadcrumbs()
			})
	}

	return (
		<Grid container >
			<Grid item xs={6}>
				<Typography
          variant="h6"
          color="inherit"
          className={props.classes.margin}
        >
					{props.queryData.name}
					{!editState &&
						<IconButton
							aria-label="Delete"
							onClick={() => setEditState(true)}
						>
							<EditIcon fontSize="small" />
						</IconButton>
					}
				</Typography>
				{editState &&
					<form
						onSubmit={handleSubmit}
						noValidate
						autoComplete="off"
					>
						<TextField
							label={LABEL_NEW_NAME}
							name="name"
							defaultValue={props.queryData.name}
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
						<Button
							variant="contained"
							className={props.classes.button}
							onClick={() => setEditState(false)}
						>
							{LABEL_CLOSE}
						</Button>
					</form>
				}
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(withRouter(ViewRegion))
