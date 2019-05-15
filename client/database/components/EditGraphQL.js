import React from 'react'
import { Mutation, Query } from "react-apollo"

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const EditGraphQL = (props) => {

	const { queryProps, children } = props
	const { query, mutation, queryParams,
					update, updateParams, middleWare } = queryProps

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
		<Query query={query.value} variables={{ ...queryParams }}>
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

        let queryData = data[query.name]

				if (loading || !queryData) {
					return (
						<div style={fullHeight}>
							<CircularProgress style={central} color="primary" />
						</div>
					)
				}

				if (middleWare) {
					queryData = middleWare(queryData)
				}

				return (
					<Mutation mutation={mutation.value}
						update={(cache, { data }) => {
							try {
								const newItem = data[mutation.name]

								cache.writeQuery({
									query: query.value,
									variables: {...queryParams},
									data: { [query.name]: newItem },
								});

								const fullData = cache.readQuery({
				          query: update.value,
				          variables: {...updateParams}
				        });
								const result = fullData[update.name].map(item => {
									if (item.id !== newItem.id) return item
									return newItem
	              })
								cache.writeQuery({
									query: update.value,
									variables: {...updateParams},
									data: { [update.name]: result },
								});
							} catch(e) {
								console.log(e)
							}
						}}
					>
						{(action, { data }) => (
              React.Children.map(children, child => (
                React.cloneElement(child, { action, queryData, queryProps })
              ))
            )}
					</Mutation>
				)
			}}
		</Query>
	)
}

export default EditGraphQL
