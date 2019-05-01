import React, { Component } from 'react'
import queryString from 'query-string'
import { Mutation, Query } from "react-apollo";

import CircularProgress from '@material-ui/core/CircularProgress'

const EditGraphQL = myProps => BaseComponent => {
  
	class EditGraphQLHOC extends Component {
		state = {
			id: '',
		}
		
		componentDidMount() {
			const { id } = queryString.parse(location.search)

			this.setState({ id })
		}	
		
    render() {
			const { query, mutation, dataName } = myProps
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
							<Mutation mutation={mutation}>
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
	
	return EditGraphQLHOC
}

export default EditGraphQL
