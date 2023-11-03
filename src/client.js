import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, fromPromise, from} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
          return fromPromise(
            fetch('/auth/refresh', {
              method: 'POST',
              credentials: 'include',
            }).then(response => {
              if (response.ok) {
                return response.json();
              } else{
              localStorage.removeItem('accessToken');
              window.location.href = '/login';
              return Promise.reject(new Error('Failed to refresh token'));
              }
            })
            .catch((error) => {
              localStorage.removeItem('accessToken');
              window.location.href = '/login';
              return Promise.reject(error);
              })
          )
            .flatMap((refreshedResponse) => {
            const newAccessToken = refreshedResponse.accessToken;
            localStorage.setItem('accessToken', newAccessToken);

            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                authorization: `Bearer ${newAccessToken}`,
              }
            }));

            return forward(operation);
          });
      }
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});