import React, { Component } from 'react'
import queryString from 'query-string'
import { Mutation, Query } from "react-apollo";

import CircularProgress from '@material-ui/core/CircularProgress'

const DeleteGraphQL = myProps => BaseComponent => {
  
	class DeleteGraphQLHOC extends Component {
		state = {
			id: '',
		}
		
		componentDidMount() {
			const { id } = queryString.parse(location.search)

			this.setState({ id })
		}	
		
    render() {
			const { query, mutation, updateGQL, updateData, actionName, dataName } = myProps
			const { id } = this.state
			
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
				
				<Query query={query} variables={{ id }}>
					{({ data, error, loading }) => {
						
						if (error) {
							return (
								<div style={fullHeight}>
									<div style={central}>
										<Typography  variant="h6" color="inherit">
											{`Error! ${error.message}`}
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
							<Mutation 
								mutation={mutation}
								update={(cache, { data }) => {
									const fullData = cache.readQuery({ query: updateGQL });
									console.log(fullData[updateData], data[actionName])
									const result = fullData[updateData].filter(item => item.id !== id)
									cache.writeQuery({
										query: updateGQL,
										// data: { [updateData]: fullData[updateData].concat([data[actionName]]) },
										data: { [updateData]: result },
									});
								}}					
							>
								{(action, { data }) => (
									<BaseComponent 
										action={action} 
										queryData={queryData}
										{...this.props} 
									/>
								)}
							</Mutation>
						)
					}}
				</Query>
      )
    }
  }
	
	return DeleteGraphQLHOC
}

export default DeleteGraphQL
