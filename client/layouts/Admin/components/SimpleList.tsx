import React, { Component, Fragment } from 'react'
import RootRef from '@material-ui/core/RootRef';

import ViewGraphQL from '../../../database/components/ViewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Divider 				from '@material-ui/core/Divider'
import List         	from '@material-ui/core/List'
import ListSubheader	from '@material-ui/core/ListSubheader'
import ListItem     	from '@material-ui/core/ListItem'
import ListItemText 	from '@material-ui/core/ListItemText'

interface ComponentProps {
	queryData			: {
		map					: (list: any) => any,
		forEach			: (list: any) => any,
	},
	extraData			: any,
	label					: string,
	current				: string,
	onClick				: (data: any) => any,
	extraAction		: (data: any, extra: any) => any,
	formatListRow	: (item: object) => any,
}

interface ComponentState {
	currentItem		: string,
}

const SimpleList = (props) => (
	<ViewGraphQL queryProps={props.queryProps}>
		<BaseComponent {...props} />
	</ViewGraphQL>
)

class BaseComponent extends Component<ComponentProps,{}> {

	state 		= { currentItem: '' }
	domRefs 	= {}
	firstLoad	= true

	componentDidMount() {
		const { extraAction, queryData, extraData, current } = this.props

		setTimeout(() => extraAction(extraData, queryData), 50)

		if (current) {
			queryData.forEach((item) => {
				if (current !== item.id) return
				this.setState({currentItem: current}, () => {
					this.scrollToCurrent(current)
				})
			})
		}
	}

	scrollToCurrent = (id) => setTimeout(() => {
		this.domRefs[id].current.scrollIntoView(
			{ block: 'center', behavior: 'instant' }
		)
	}, 50)

	handleOnClick = (item) => {
		this.setState({currentItem: item.id})
		this.props.onClick && this.props.onClick(item)
	}

	render() {

		if (this.firstLoad) {
			this.props.queryData.forEach((item) => {
				this.domRefs[item.id] = React.createRef()
			})
			this.firstLoad = false
		}

		return (
			<List component="nav">
				<ListSubheader disableSticky>
					{this.props.label}
				</ListSubheader>
				<Divider/>
				{this.props.queryData.map(item => (
					<RootRef key={item.id} rootRef={this.domRefs[item.id]}>
						<Fragment>
							<ListItem button
								selected={this.state.currentItem === item.id}
								onClick={() => this.handleOnClick(item)}
							>
								{this.props.formatListRow ? (
									<ListItemText {...this.props.formatListRow(item)} />
								) : (
									<ListItemText primary={item.name} />
								)}
							</ListItem>
							<Divider/>
						</Fragment>
					</RootRef>
	  		))}
	  	</List>
		)
	}
}

export default SimpleList
