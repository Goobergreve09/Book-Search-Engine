const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You are not authenticated');
      }
      
      // If authenticated, return the user data
      return User.findById(context.user._id).select('-password');
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const validPassword = await user.isValidPassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { bookData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to save books');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    },

    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to remove books');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    }
  }
};

module.exports = resolvers;



