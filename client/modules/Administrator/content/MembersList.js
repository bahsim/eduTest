import React, { Component, Fragment, useState } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Grid        		from '@material-ui/core/Grid'
import Divider      	from '@material-ui/core/Divider'

import Button 				from '@material-ui/core/Button'
import AddIcon 			  from '@material-ui/icons/Add'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import EditIcon       from '@material-ui/icons/Edit'

import SimpleList from '../../../components/SimpleList.tsx'
import NewRecord	from '../../../components/NewRecord.tsx'

const styles = theme => ({
	button: {
		margin      : theme.spacing.unit/2,
		marginRight : theme.spacing.unit*2,
	},
  icon: {
		marginRight : theme.spacing.unit,
	}
})

class MembersList extends Component {

	state = {
		mode		: 'registry',
		itemId	: '',
	}

	render() {
		if (!this.props.data.ownerId) return null

		const { mode, itemId } = this.state

		return (
			<Fragment>
				<Divider />
				{mode === 'registry' &&
					<Fragment>
						<Button
							className	= {this.props.classes.button}
							onClick		= {() => this.setState({ mode: 'newItem'})}
						>
							<AddIcon className={this.props.classes.icon}/>
							{'Добавить'}
						</Button>
						{itemId !== '' &&
							<Button
								className	= {this.props.classes.button}
								onClick		= {() => this.setState({ mode: 'editItem'})}
							>
								<EditIcon className={this.props.classes.icon}/>
								{'Изменить'}
							</Button>
						}
						<Divider />
						<SimpleList
							queryProps = {{
								query       : this.props.queryList,
								queryParams : { groupId	: this.props.data.ownerId },
							}}
							onClick				= {(item)	=> this.setState({ itemId: item.id})}
							onDoubleClick = {() 		=> this.setState({ mode: 'editItem'})}
							extraAction 	= {() 		=> {}}
							current 			= {itemId}
							label 				= {this.props.labelListName}
						/>
					</Fragment>
				}
				{mode === 'newItem' &&
					<Fragment>
						<Button
							className = {this.props.classes.button}
							onClick		= {() => this.setState({ mode: 'registry'})}
						>
							<ArrowBackIcon className={this.props.classes.icon}/>
							{'Отмена'}
						</Button>
						<Divider />
						<Grid container >
							<Grid item xs={6}>
								<NewRecord
									queryProps = {{
										mutation    		: this.props.mutateAdd,
										mutationParams	: {
											regionId			: this.props.data.regionId,
											groupId				: this.props.data.ownerId,
										},
										update      		: this.props.queryList,
										updateParams		: { groupId : this.props.data.ownerId },
									}}
									onClick = {(item) => {
										this.setState({
											mode	: 'registry',
											itemId: item.id,
										})
									}}
									extraAction = {() => {}}
								/>
							</Grid>
						</Grid>
					</Fragment>
				}
			</Fragment>
		)
	}
}


export default withStyles(styles)(MembersList)
