import React, { Component } from 'react'
import { Mutation, Query } from "react-apollo";
import { withRouter } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const DeleteGraphQL = (props) => {

	const { queryProps, children } = props
	const { query, mutation, update, queryParams, updateParams } = queryProps

	const { id } = queryParams

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

				const queryData = data[query.name]

				if (loading || !queryData) {
					return (
						<div style={fullHeight}>
							<CircularProgress style={central} color="primary" />
						</div>
					)
				}

				return (
					<Mutation
						mutation={mutation.value}
						update={(cache, { data }) => {

							const fullData = cache.readQuery({
								query: update.value,
								variables: {...updateParams}
							});

							const result = fullData[update.name].filter(item => (
                item.id !== id
              ))

							cache.writeQuery({
								query: update.value,
								variables: {...updateParams},
								data: { [update.name]: result },
							});
						}}
					>
						{(action, { data }) => (
              React.Children.map(children, child => (
                React.cloneElement(child, { action, queryData })
              ))
						)}
					</Mutation>
				)
			}}
		</Query>
	)
}

export default DeleteGraphQL
