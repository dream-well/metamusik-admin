import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

import { onError } from '@apollo/client/link/error'
import Auth from '../components/Auth'
import Head from 'next/head'

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if(graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert( `Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "https://metamusik.cleverapps.io/graphql" }),
])


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Auth>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Auth>
    </>
  )
    
}

export default MyApp
