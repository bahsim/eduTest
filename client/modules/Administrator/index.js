import React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router'

import { ApolloClient }   from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink }       from 'apollo-link-http'
import { InMemoryCache }  from 'apollo-cache-inmemory'

import Main from './container'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri     : `http://${window.location.hostname}/api`,
  headers : {},
})

const client = new ApolloClient({
  link  : httpLink,
  cache : cache,
})

const history = createBrowserHistory()

const Root = () => (
	<ApolloProvider client={client}>
    <Router history={history}>
			<Main />
    </Router>
	</ApolloProvider>
)

render(<Root />, document.getElementById('app'))
