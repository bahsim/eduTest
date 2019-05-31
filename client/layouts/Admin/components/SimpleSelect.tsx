import React, { Component } from 'react'

import ViewGraphQL from '../../../database/components/ViewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Input 					from '@material-ui/core/Input'
import InputLabel 		from '@material-ui/core/InputLabel'
import MenuItem 			from '@material-ui/core/MenuItem'
import FormControl 		from '@material-ui/core/FormControl'
import Select 				from '@material-ui/core/Select'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

interface ComponentProps {
	classes: {
		root				: string,
		formControl	: object,
	}
	queryData			: {
		map					: (list: any) => any,
	},
	onClick				: (data: any) => any,
	label					: string,
}

interface ComponentState {
	currentItem: string,
}

const SimpleList = (props) => (
	<ViewGraphQL queryProps={props.queryProps}>
		<BaseComponent {...props} />
	</ViewGraphQL>
)

class BaseComponent extends Component<ComponentProps,{}> {

	state = {
    currentItem: this.props.currentItem
  }

	handleOnClick = (itemId) => {
		this.setState({currentItem: itemId})
		this.props.onClick && this.props.onClick(itemId)
	}

	render() {
		const { classes } = this.props

		return (
	    <FormControl className={classes.formControl}>
	      <InputLabel htmlFor="my-input">
					{this.props.label}
				</InputLabel>
	      <Select
	        value={this.state.currentItem}
	        inputProps={{
	          name: 'input',
	          id: 'my-input',
	        }}
					onChange={(e) => this.handleOnClick(e.target.value)}
	      >
	        <MenuItem value="">
	          <em>{'Все'}</em>
	        </MenuItem>
					{this.props.queryData.map(item => (
	          <MenuItem
							key={item.id}
							value={item.id}
						>
							{item.name}
						</MenuItem>
					))}
	      </Select>
	    </FormControl>
		)
	}
}

export default withStyles(styles)(SimpleList)
