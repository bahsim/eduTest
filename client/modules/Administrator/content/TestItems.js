import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Divider      	from '@material-ui/core/Divider'
import Typography     from '@material-ui/core/Typography'

import Button 				from '@material-ui/core/Button'
import AddIcon 			  from '@material-ui/icons/Add'
import ArrowBackIcon  from '@material-ui/icons/ArrowBack'
import EditIcon       from '@material-ui/icons/Edit'
import DeleteIcon     from '@material-ui/icons/DeleteForever'

import SimpleList 	from '../../../components/SimpleList.tsx'
import DeleteRecord	from '../../../components/DeleteRecord.tsx'

import NewTestItem	from './NewTestItem.tsx'
import EditTestItem	from './EditTestItem.tsx'

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
									{`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
								</span>
							:
								<span key={index}>
									{`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
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
						<NewTestItem
							queryProps = {{
								mutation    		: this.props.mutateAdd,
								mutationParams	: {
									testId 				: this.props.data.ownerId,
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
						<EditTestItem
							queryProps = {{
								query			    : this.props.queryItem,
	      				mutation      : this.props.mutateEdit,
								mutationParams: { id: this.state.itemId },
	              queryParams   : { id: this.state.itemId },
	      				update        : this.props.queryList,
								updateParams	: { testId : this.props.data.ownerId },
							}}
							onClick = {(item) => {
								this.setState({
									mode	: 'registry',
									itemId: item.id,
								})
							}}
						/>
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
						<DeleteRecord
	            queryProps = {{
	      				query			    : this.props.queryItem,
	      				mutation      : this.props.mutateDelete,
								queryParams   : { id: this.state.itemId },
	      				update		    : this.props.queryList,
								updateParams	: { testId : this.props.data.ownerId },
	            }}
							onClick = {(item) => {
								this.setState({
									mode	: 'registry',
									itemId: '',
								})
							}}
							formatItem	= {(item) => formatListRow(item)}
							extraAction = {() => {}}
	          />
					</Fragment>
				}
			</Fragment>
		)
	}
}


export default withStyles(styles)(MembersList)
