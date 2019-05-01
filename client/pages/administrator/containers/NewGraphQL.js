import React, { Component } from 'react'
import queryString from 'query-string'
import { Mutation } from "react-apollo";

import CircularProgress from '@material-ui/core/CircularProgress'

const NewGraphQL = myProps => BaseComponent => {
  
	const NewGraphQLHOC = (props) => {
		
		const { mutation, updateGQL, updateData, actionName } = myProps
		
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
						data: { [updateData]: fullData[updateData].concat([data[actionName]]) },
					});
				}}					
			>
				{(action, { data }) => (
					<BaseComponent 
						action={action} 
						{...props} 
					/>
				)}
			</Mutation>
		)
  }
	
	return NewGraphQLHOC
}

export default NewGraphQL
