const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id)
                    .select('-__v -password')
            } else {
                throw new AuthenticationError('You are not logged in')
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return { 
                user,
                token: signToken(user)
            };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            return { 
                user,
                token: signToken(user)
            };
        },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: input } },
                    { new: true }
                ).select('-__v -password')
            } else {
                throw new AuthenticationError('You are not logged in')
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                ).select('-__v -password')
            } else {
                throw new AuthenticationError('You are not logged in')
            }
        }
    }
};

module.exports = resolvers;