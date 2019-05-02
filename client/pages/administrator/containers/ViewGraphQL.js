import React, { Component } from 'react'
import { Query } from "react-apollo";
import { withRouter } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const ViewGraphQL = myProps => BaseComponent => {
  
	class ViewGraphQLHOC extends Component {
		state = {
			id: '',
		}
		
		componentDidMount() {
			const { id } = this.props.match.params

			this.setState({ id })
		}	
		
    render() {
			const { query, dataName } = myProps
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
							<BaseComponent 
								queryData={queryData}
								{...this.props} 
							/>
						)
					}}
				</Query>
      )
    }
  }
	
	return withRouter(ViewGraphQLHOC)
}

export default ViewGraphQL
