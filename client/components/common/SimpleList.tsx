import React, { Component, useState, useEffect } from 'react'
import RootRef from '@material-ui/core/RootRef';

import ViewGraphQL from '../../database/components/ViewGraphQL'

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
	onClick				: (id: string, name: string) => any,
	onDoubleClick	: (id: string, name: string) => any,
	extraAction		: (data: any) => any,
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
		if (this.props.extraData) {
			this.pullExtraData(this.props.extraData)
		}
		if (this.props.current) {
			this.props.queryData.forEach((item) => {
				if (this.props.current !== item.id) return
				this.setState({currentItem: this.props.current}, () => {
					this.scrollToCurrent(this.props.current)
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

	pullExtraData = (data) => {
		setTimeout(() => this.props.extraAction(data), 50)
	}

	handleOnClick = (id, name) => {
		this.setState({currentItem: id})
		this.props.onClick && this.props.onClick(id, name)
	}

	handleOnDoubleClick = (id, name) => {
		this.setState({currentItem: id})
		this.props.onDoubleClick && this.props.onDoubleClick(id, name)
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
								onClick={() => this.handleOnClick(item.id, item.name)}
								onDoubleClick={() => this.handleOnDoubleClick(item.id, item.name)}
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
