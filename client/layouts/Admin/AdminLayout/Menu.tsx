import React          from 'react'
import { withRouter } from 'react-router-dom'

import List         from '@material-ui/core/List'
import ListItem     from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider      from '@material-ui/core/Divider'

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

const Menu = ({list, history}: ComponentProps) => (
  <div>
    <List component="nav">
  		{list.map((el,idx) => (
  			<span key={idx} onClick={() => history.replace(el.link)}>
  				<ListItem button>
  					<ListItemIcon>{el.icon}</ListItemIcon>
  					<ListItemText primary={el.label} />
  				</ListItem>
  				<Divider />
  			</span>
  		))}
  	</List>
  </div>
)

export default withRouter(Menu)
