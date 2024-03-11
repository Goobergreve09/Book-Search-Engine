import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Wrap your application with ApolloProvider
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;

