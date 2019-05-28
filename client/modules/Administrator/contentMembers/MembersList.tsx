import React, { Component } from 'react'

import Container			from '../../../layouts/Admin/containers/ContentList.tsx'

import SimpleList 		from '../../../layouts/Admin/components/SimpleList.tsx'
import NewRecord			from '../../../layouts/Admin/components/NewRecord.tsx'
import EditRecord			from '../../../layouts/Admin/components/EditRecord.tsx'
import DeleteRecord		from '../../../layouts/Admin/components/DeleteRecord.tsx'

interface ComponentProps {
	data: {
		ownerId			: string,
		regionId		: string,
	},
	queryList			: any,
	queryItem			: any,
	mutateAdd			: any,
	mutateEdit		: any,
	mutateDelete	: any,
	labelListName	: any,
	scrollTop		: number,
	roofTop			: number,
	roofLeft		: number,
}

interface ComponentState {
	mode		: string,
	itemId	: string,
}

class MembersList extends Component<ComponentProps,ComponentState> {

	state = {
		mode		: '',
		itemId	: '',
	}

	render() {
		if (!this.props.data.ownerId) return null

		return  (
			<Container
				scrollTop	= {this.props.scrollTop}
				roofTop		= {this.props.roofTop}
				roofLeft	= {this.props.roofLeft}

				setState	= {(state) => this.setState(state)}
				state			= {this.state}

				registry={{
					component: SimpleList,
					queryProps: {
						query       : this.props.queryList,
						queryParams : { groupId	: this.props.data.ownerId },
					},
					label: this.props.labelListName
				}}

				newItem={{
					component: NewRecord,
					queryProps: {
						mutation    		: this.props.mutateAdd,
						mutationParams	: {
							regionId			: this.props.data.regionId,
							groupId				: this.props.data.ownerId,
						},
						update      		: this.props.queryList,
						updateParams		: { groupId : this.props.data.ownerId },
					},
				}}

				editItem={{
					component: EditRecord,
					queryProps: {
						query			    : this.props.queryItem,
						queryParams		: { id: this.state.itemId },
						mutation      : this.props.mutateEdit,
						update        : this.props.queryList,
						updateParams	: { groupId : this.props.data.ownerId },
					}
				}}

				deleteItem={{
					component: DeleteRecord,
					queryProps: {
						query			    : this.props.queryItem,
						queryParams		: { id: this.state.itemId },
						mutation      : this.props.mutateDelete,
						update		    : this.props.queryList,
						updateParams	: { groupId : this.props.data.ownerId },
					}
				}}
			/>
		)
	}
}

export default MembersList
