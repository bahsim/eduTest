import React from 'react'
import { Mutation } from "react-apollo";

import CircularProgress from '@material-ui/core/CircularProgress'

const NewGraphQL = props => {

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
