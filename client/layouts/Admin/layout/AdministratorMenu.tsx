import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import List         from '@material-ui/core/List'
import ListItem     from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

interface MenuItem {
  link  : string,
  icon  : any,
  label : string,
}

interface ComponentProps {
  list: {
    map   : ( method: (item: MenuItem, index: number) => any ) => any,
  },
  history : {replace : (url: string) => any},
}

const AdministratorMenu = ({list, history}: ComponentProps) => (
  <Fragment>
    <List component="nav">
  		{list.map((el,idx) => (
				<ListItem button key={idx} onClick={() => history.replace(el.link)}>
					<ListItemIcon>{el.icon}</ListItemIcon>
					<ListItemText primary={el.label} />
				</ListItem>
  		))}
  	</List>
  </Fragment>
)

export default withRouter(AdministratorMenu)
