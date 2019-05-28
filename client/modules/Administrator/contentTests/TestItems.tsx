import React, { Fragment, Component } from 'react'

import Container			from '../../../layouts/Admin/containers/ContentList.tsx'

import SimpleList 	from '../../../layouts/Admin/components/SimpleList.tsx'
import DeleteRecord	from '../../../layouts/Admin/components/DeleteRecord.tsx'

import NewTestItem	from './NewTestItem.tsx'
import EditTestItem	from './EditTestItem.tsx'

interface ComponentProps {
	data: {
		ownerId			: string,
	},
	queryList			: any,
	queryItem			: any,
	mutateAdd			: any,
	mutateEdit		: any,
	mutateDelete	: any,
	labelListName	: string,
	scrollTop			: number,
	roofTop				: number,
	roofLeft				: number,
}

interface ComponentState {
	mode		: string,
	itemId	: string,
}

class TestItems extends Component<ComponentProps,ComponentState> {

	state = {
		mode		: '',
		itemId	: '',
	}

	formatListRow = (item) => ({
		primary		: item.value,
		secondary	: this.formatVariants(item.variants)
	})

	formatRow = (item) => (
		<Fragment>
			<span style={{fontWeight: 'bold'}}>
				{item.value}<br/>
			</span>
			<span style={{ fontStyle: 'italic' }}>
				{this.formatVariants(item.variants)}
			</span>
		</Fragment>
	)

	formatVariants = (variants) => variants.map((variant, index) => (
		(variant.mark === true ?
			<span key={index} style={{fontWeight: 'bold'}}>
				{`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
			</span>
		:
			<span key={index}>
				{`${index+1}) ${variant.value}`}&nbsp;&nbsp;&nbsp;
			</span>
		)
	))

	render() {
		if (!this.props.data.ownerId) return null

		return (
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
						queryParams : { testId	: this.props.data.ownerId },
					},
					label: this.props.labelListName,
					formatListRow: (item) => this.formatListRow(item),
				}}

				newItem={{
					component: NewTestItem,
					queryProps: {
						mutation    		: this.props.mutateAdd,
						mutationParams	: {
							testId 				: this.props.data.ownerId,
						},
						update      		: this.props.queryList,
						updateParams		: { testId : this.props.data.ownerId },
					},
				}}

				editItem={{
					component: EditTestItem,
					queryProps: {
						query			    : this.props.queryItem,
						mutation      : this.props.mutateEdit,
						mutationParams: { id: this.state.itemId },
						queryParams   : { id: this.state.itemId },
						update        : this.props.queryList,
						updateParams	: { testId : this.props.data.ownerId },
					}
				}}

				deleteItem={{
					component: DeleteRecord,
					queryProps: {
						query			    : this.props.queryItem,
						mutation      : this.props.mutateDelete,
						queryParams   : { id: this.state.itemId },
						update		    : this.props.queryList,
						updateParams	: { testId : this.props.data.ownerId },
					},
					formatItem: (item) => this.formatRow(item),
				}}
			/>
		)
	}
}

export default TestItems
