import React, { Component, useState, useEffect } from 'react'
import RootRef from '@material-ui/core/RootRef';

import ViewGraphQL from '../database/components/ViewGraphQL'

import { withStyles } from '@material-ui/core/styles'
import Table 					from '@material-ui/core/Table'
import TableBody 			from '@material-ui/core/TableBody'
import TableCell 			from '@material-ui/core/TableCell'
import TableHead 			from '@material-ui/core/TableHead'
import TableRow 			from '@material-ui/core/TableRow'
import AddIcon 				from '@material-ui/icons/Add'
import PageviewIcon 	from '@material-ui/icons/Pageview'

const styles = theme => ({
	tableRow: {
		cursor: 'pointer',
	},
})

interface ComponentProps {
	classes: {
		tableRow		: object
	},
	queryData			: {
		map					: (list: any) => any,
		forEach			: (list: any) => any,
	},
	extraData			: any,
	label					: string,
	current				: string,
	onClick				: (data: any) => any,
	onDoubleClick	: (data: any) => any,
	extraAction		: (data: any, extra: any) => any,
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

	state = {
		currentItem: ''
	}

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

	scrollToCurrent = (id) => {
		setTimeout(() => {
			this.domRefs[id].current.scrollIntoView(
				{ block: 'center', behavior: 'instant' }
			)
		}, 50)
	}

	handleOnClick = (item) => {
		this.setState({currentItem: item.id})
		this.props.onClick && this.props.onClick(item)
	}

	handleOnDoubleClick = (item) => {
		this.setState({currentItem: item.id})
		this.props.onDoubleClick && this.props.onDoubleClick(item)
	}

	render() {

		if (this.firstLoad) {
			this.props.queryData.forEach((item) => {
				this.domRefs[item.id] = React.createRef()
			})
			this.firstLoad = false
		}

		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>{this.props.label}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{this.props.queryData.map(item => (
						<RootRef key={item.id} rootRef={this.domRefs[item.id]}>
							<TableRow hover
								className={this.props.classes.tableRow}
								selected={this.state.currentItem === item.id}
								onClick={() => this.handleOnClick(item)}
								onDoubleClick={() => this.handleOnDoubleClick(item)}
							>
								<TableCell component="th" scope="row" >
									{item.name}
								</TableCell>
							</TableRow>
						</RootRef>
					))}
				</TableBody>
			</Table>
		)
	}
}

export default withStyles(styles)(SimpleList)
