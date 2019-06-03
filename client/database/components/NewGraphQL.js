import React from 'react'
import { Query, Mutation } from "react-apollo";

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography       from '@material-ui/core/Typography'

const NewGraphQL = (props) => {

  const { queryProps, children } = props
	const { query, mutation, update, middleWare,
					queryParams, updateParams, updateWare } = queryProps

	const fullHeight = {
		position	: 'relative',
		height		: '100%',
		width			: '100%',
	}
	const central = {
		position	: 'absolute',
		top				: '50%',
		left			: '50%',
		transform	: 'translate(-50%, -50%)',
	}

	const MutationInject = (queryData) => {
		return (
			<Mutation
				mutation	= {mutation.value}
				update		= {(cache, { data }) => {
					try {
						let fullData = cache.readQuery({
							query			: update.value,
							variables	: {...updateParams}
						})

						if (updateWare) {
							fullData = updateWare(fullData, update.name)
						}

						cache.writeQuery({
							query			: update.value,
							variables	: {...updateParams},
							data: {
								[update.name]: [ data[mutation.name], ...fullData[update.name] ]
							},
						})
					} catch(e) {}
				}}
			>
				{(action, { data }) => (
					React.Children.map(children, child => (
						React.cloneElement(child, { action, queryProps, queryData })
					))
				)}
			</Mutation>
		)
	}
	if (query) {
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

					return MutationInject(queryData)
				}}
			</Query>
		)
	} else {
		return MutationInject({})
	}

}

export default NewGraphQL
