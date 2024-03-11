const Book = require('../server/models/Book'); 

const resolvers = {
  Query: {
    books: async () => {
      try {
        // Fetch all books from the database
        return await Book.find();
      } catch (error) {
        throw new Error('Failed to fetch books');
      }
    },
    book: async (_, { _id }) => {
      try {
        // Find a book by its ID
        return await Book.findById(_id);
      } catch (error) {
        throw new Error('Failed to fetch book');
      }
    }
  },
  Mutation: {
    addBook: async (_, args) => {
      try {
        // Create a new book instance
        const newBook = new Book(args);
        // Save the book to the database
        await newBook.save();
        return newBook;
      } catch (error) {
        throw new Error('Failed to add book');
      }
    }
  }
};

module.exports = resolvers;

