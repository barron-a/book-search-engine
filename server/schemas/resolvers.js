const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello World!';
        }
    },
    Mutation: {
        addUser: async () => {

        },
        login: async () => {
            
        }
    }
};

module.exports = resolvers;