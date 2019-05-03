import React, { Component } from 'react'
import { Mutation } from "react-apollo";

import CircularProgress from '@material-ui/core/CircularProgress'

const NewGraphQL = BaseComponent => {
  
	const NewGraphQLHOC = props => {
		
		const { queryProps } = props
		
		const { 
			mutation, 
			updateGQL, 
			updateData, 
			actionName,
		} = queryProps
		
		const fullHeight = {
			position: 'relative',
			height: '100%',
			width: '100%',
		}
		const central = {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}

		return (
			<Mutation 
				mutation={mutation}
				update={(cache, { data }) => {
					const fullData = cache.readQuery({ query: updateGQL });
					cache.writeQuery({
						query: updateGQL,
						data: { [updateData]: [ data[actionName], ...fullData[updateData] ] },
					});
				}}					
			>
				{(action, { data }) => (
					<BaseComponent action={action} {...props} />
				)}
			</Mutation>
		)
  }
	
	return NewGraphQLHOC
}

export default NewGraphQL
