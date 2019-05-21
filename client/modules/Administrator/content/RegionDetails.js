import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Divider      	from '@material-ui/core/Divider'
import Button 				from '@material-ui/core/Button'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import EditIcon       from '@material-ui/icons/Edit'

import ViewRegionDetails from './ViewRegionDetails.tsx'
import EditRegionDetails from './EditRegionDetails.tsx'

const styles = theme => ({
	title: {
		marginTop: theme.spacing.unit*2
	},
	button: {
		margin      : theme.spacing.unit/2,
		marginRight : theme.spacing.unit*2,
	},
  icon: {
		marginRight : theme.spacing.unit,
	},
	margin: {
    margin      : theme.spacing.unit,
  },
})

class RegionDetails extends Component {

	state = {
		mode		: 'view',
	}

	render() {
		if (!this.props.data.ownerId) return null

		const { mode } = this.state

		return (
			<Fragment>
				<Divider />
				{mode === 'view' &&
					<Fragment>
						<Button
							className	= {this.props.classes.button}
							onClick		= {() => this.setState({ mode: 'edit' })}
						>
							<EditIcon className={this.props.classes.icon}/>
							{'Изменить'}
						</Button>
						<Divider />
						<ViewRegionDetails
							queryProps = {{
	      				query			    : this.props.queryItem,
	              queryParams   : { id: this.props.data.ownerId },
	            }}
						/>
					</Fragment>
				}
				{mode === 'edit' &&
					<Fragment>
						<Button
							className	= {this.props.classes.button}
							onClick		= {() => this.setState({ mode: 'view' })}
						>
							<ArrowBackIcon className={this.props.classes.icon}/>
							{'Отмена'}
						</Button>
						<Divider />
						<EditRegionDetails
							queryProps = {{
								query			    : this.props.queryItem,
								mutation      : this.props.mutateEdit,
								queryParams   : { id: this.props.data.ownerId },
								update        : this.props.queryList,
								updateParams  : {},
							}}
							onClick={() => this.setState({ mode: 'view' })}
						/>
					</Fragment>
				}
			</Fragment>
		)
	}
}


export default withStyles(styles)(RegionDetails)
