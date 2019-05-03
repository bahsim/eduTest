import React, { Component } from 'react'
import { Mutation, Query } from "react-apollo";
import { withRouter } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const EditGraphQL = BaseComponent => {
  
	const EditGraphQLHOC = props => {
		
		const { queryProps } = props
		
		const { 
			query, 
			queryParams, 
			mutation, 
			dataName,
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
			<Query query={query} variables={{ ...queryParams }}>
				{({ data, error, loading }) => {
					
					if (error) {
						return (
							<div style={fullHeight}>
								<div style={central}>
									<Typography  variant="h6" color="inherit">
										{`${error.message}`}
									</Typography>
								</div>
							</div>
						)
					}
					
					const queryData = data[dataName]
					
					if (loading || !queryData) {
						return (
							<div style={fullHeight}>
								<CircularProgress style={central} color="primary" />
							</div>
						)
					}
					
					return (
						<Mutation mutation={mutation}>
							{(action, { data }) => (
								<BaseComponent 
									action={action} 
									queryData={queryData}
									{...props} 
								/>
							)}
						</Mutation>
					)
				}}
			</Query>
		)
  }
	
	return withRouter(EditGraphQLHOC)
}

export default EditGraphQL
