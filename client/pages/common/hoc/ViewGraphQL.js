import React, { Component } from 'react'
import { Query } from "react-apollo";
import { withRouter } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const ViewGraphQL = BaseComponent => {
  
	const ViewGraphQLHOC = props => {
		
		const { queryProps } = props
		
		const { 
			query, 
			queryParams, 
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
					
					if (loading || !data[dataName]) {
						return (
							<div style={fullHeight}>
								<CircularProgress style={central} color="primary" />
							</div>
						)
					}
					
					return (
						<BaseComponent queryData={data[dataName]} {...props} />
					)
				}}
			</Query>
		)
  }
	
	return withRouter(ViewGraphQLHOC)
}

export default ViewGraphQL
