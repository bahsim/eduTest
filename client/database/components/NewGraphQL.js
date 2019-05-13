import React from 'react'
import { Mutation, Types } from "react-apollo";

import CircularProgress from '@material-ui/core/CircularProgress'

interface ComponentProps {
	queryProps: {
		query: { value: string, name: string },
		mutation: { value: string, name: string },
		update: { value: string, name: string },
		updateParams: any
	},
	children: any,
}

const NewGraphQL = (props) => {

  const { queryProps, children } = props
	const { mutation, update, updateParams } = queryProps

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
      mutation={mutation.value}
      update={(cache, { data }) => {
				try {
					const fullData = cache.readQuery({
	          query: update.value,
	          variables: {...updateParams}
	        });

	        cache.writeQuery({
	          query: update.value,
	          variables: {...updateParams},
	          data: {
	            [update.name]: [ data[mutation.name], ...fullData[update.name] ]
	          },
	        });
				} catch(e) {}
      }}
    >
      {(action, { data }) => (
        React.Children.map(children, child => (
          React.cloneElement(child, { action, queryProps })
        ))
      )}
    </Mutation>
	)
}

export default NewGraphQL
