import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Grid        		from '@material-ui/core/Grid'
import Divider      	from '@material-ui/core/Divider'
import Typography     from '@material-ui/core/Typography'

import Button 				from '@material-ui/core/Button'
import AddIcon 			  from '@material-ui/icons/Add'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import EditIcon       from '@material-ui/icons/Edit'
import DeleteIcon     from '@material-ui/icons/DeleteForever'

import SimpleList 	from '../../../components/SimpleList.tsx'
import NewRecord		from '../../../components/NewTestItem.tsx'
import EditRecord		from '../../../components/EditRecord.tsx'
import DeleteRecord	from '../../../components/DeleteRecord.tsx'

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

		const formatListRow = (item) => (
			<Fragment>
				{item.value}<br/>
				<span style={{ fontStyle: 'italic' }}>
					{item.variants.map((variant, index) => (
							(variant.mark === true ?
								<span key={index} style={{fontWeight: 'bold'}}>
									{variant.value}&nbsp;&nbsp;&nbsp;
								</span>
							:
								<span key={index}>
									{variant.value}&nbsp;&nbsp;&nbsp;
								</span>
							)
					))}
				</span>
			</Fragment>
		)

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
							<Fragment>
								<Button
									className	= {this.props.classes.button}
									onClick		= {() => this.setState({ mode: 'editItem'})}
								>
									<EditIcon className={this.props.classes.icon}/>
									{'Изменить'}
								</Button>
								<Button
									className	= {this.props.classes.button}
									onClick		= {() => this.setState({ mode: 'deleteItem'})}
								>
									<DeleteIcon className={this.props.classes.icon}/>
									{'Удалить'}
								</Button>
							</Fragment>
						}
						<Divider />
						<SimpleList
							queryProps = {{
								query       : this.props.queryList,
								queryParams : { testId	: this.props.data.ownerId },
							}}
							onClick				= {(item)	=> this.setState({ itemId: item.id})}
							onDoubleClick = {() 		=> this.setState({ mode: 'editItem'})}
							extraAction 	= {() 		=> {}}
							current 			= {itemId}
							label 				= {this.props.labelListName}
							formatListRow	= {(item) => formatListRow(item)}
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
						<Typography
							variant="h6"
							color="inherit"
							className={this.props.classes.title}
						>
			  			{'Новая запись'}
			  		</Typography>
						<NewRecord
							queryProps = {{
								mutation    		: this.props.mutateAdd,
								mutationParams	: {
									regionId			: this.props.data.regionId,
									groupId				: this.props.data.ownerId,
								},
								update      		: this.props.queryList,
								updateParams		: { testId : this.props.data.ownerId },
							}}
							onClick = {(item) => {
								this.setState({
									mode	: 'registry',
									itemId: item.id,
								})
							}}
							extraAction = {() => {}}
						/>
					</Fragment>
				}
				{mode === 'editItem' &&
					<Fragment>
						<Button
							className = {this.props.classes.button}
							onClick		= {() => this.setState({ mode: 'registry'})}
						>
							<ArrowBackIcon className={this.props.classes.icon}/>
							{'Отмена'}
						</Button>
						<Divider />
						<Typography
							variant="h6"
							color="inherit"
							className={this.props.classes.title}
						>
			  			{'Изменение записи'}
			  		</Typography>
						<Grid container >
							<Grid item xs={6}>
								<EditRecord
									queryProps = {{
										query			    : this.props.queryItem,
			      				mutation      : this.props.mutateEdit,
			              queryParams   : { id: this.state.itemId },
			      				update        : this.props.queryList,
										updateParams	: { groupId : this.props.data.ownerId },
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
				{mode === 'deleteItem' &&
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
								<DeleteRecord
			            queryProps = {{
			      				query			    : this.props.queryItem,
			      				mutation      : this.props.mutateDelete,
										queryParams   : { id: this.state.itemId },
			      				update		    : this.props.queryList,
										updateParams	: { groupId : this.props.data.ownerId },
			            }}
									onClick = {(item) => {
										this.setState({
											mode	: 'registry',
											itemId: '',
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
