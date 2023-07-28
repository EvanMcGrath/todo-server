import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


import { v4 as uuidv4 } from 'uuid';


const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type toDo {
    id: ID!
    task: String! 
    completed: Boolean!
  }

  type Query {
    allToDos: [toDo],
    activeToDos: [toDo]
  }

  type Mutation {
    createToDo(task: String!, completed: Boolean!): toDo,
    updateToDo(id: String!, completed: Boolean!): toDo,
    deleteToDo(id: String!): toDo,
  }
`;


let toDoData = [
  { 
    id: "1", 
    task: 'Walk the dog',
    completed: false, 
  },
  {
    id: "2",
    task: 'Grocery Shopping',
    completed: false, 
  },
  {
    id: "3",
    task: 'Go to the gym',
    completed: true, 
  }
];



const resolvers = {
  Query: {
    allToDos: () => toDoData,
    activeToDos: () => {
      return toDoData.filter((i) => !i.completed)
    }
  },


  Mutation: {
    createToDo: (parent, args) => {
      const newToDo = args;
      console.log(args)
      newToDo.id = uuidv4();
      toDoData.push(newToDo);
      console.log(newToDo);
      return newToDo
    },

    //Make sure to add error handling here for if completed value on selected task is already true 
    updateToDo: (parent, args) => {
      toDoData.forEach((i) => {
      if (i.id === args.id && args.completed) {
        i.completed = true
      }
    })
      return toDoData.find((i) => {
        return i.id === args.id
      });
    },


    deleteToDo: (parent, args) => {
      // const modifiedData = toDoData.filter((i) => args.id ==! i.id);
      // toDoData = [...modifiedData];
      // return true
      let deleteIndex;
      let resObject;
      toDoData.forEach((i, index) => {
        if (args.id === i.id) {
          deleteIndex = index;
          resObject = i; 
        }
      })
      toDoData.splice(deleteIndex, 1)
      console.log(toDoData);
      return resObject
    }  
    }
  }
;



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