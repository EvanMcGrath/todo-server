import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuidv4 } from 'uuid';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type toDo {
    id: ID!
    task: String! 
    completed: Boolean!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    allToDos: [toDo],
    activeToDos: [toDo]
  }

  type Mutation {
    createToDo(task: String!, completed: Boolean!): toDo,
  }
`;
const toDoData = [
    {
        id: 1,
        task: 'Walk the dog',
        completed: false,
    },
    {
        id: 2,
        task: 'Grocery Shopping',
        completed: false,
    },
    {
        id: 3,
        task: 'Go to the gym',
        completed: true,
    }
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        allToDos: () => toDoData,
        activeToDos: () => {
            return toDoData.filter((i) => !i.completed);
        }
    },
    Mutation: {
        createToDo(parent, args) {
            const newToDo = args;
            newToDo.id = uuidv4();
            toDoData.push(newToDo);
            return newToDo;
        },
        // deleteToDo
    }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
