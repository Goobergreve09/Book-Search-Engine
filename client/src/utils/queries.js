import { gql } from '@apollo/client';

// GET_ME query
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id      // Include any fields you need in the response
      username
      email
      savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;