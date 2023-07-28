import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


import { v4 as uuidv4 } from 'uuid';

// Tried to set up typeDefs and resolvers but could not figure out how to import typescript files that made the bundler/compiler happy 
const typeDefs = `#graphql
  type toDo {
    id: ID!
    task: String! 
    completed: Boolean!
  }
  # Added the allToDos query as a glorified console.log to check that all changes were staying consistent in data set 
  type Query {
    allToDos: [toDo],
    activeToDos: [toDo]
  }

# I would have liked to set up input definitions for the mutations but was running into issues with the resolver syntax when implementing
# so decided to keep it simple and write them in line 
  type Mutation {
    createToDo(task: String!, completed: Boolean!): toDo,
    updateToDo(id: ID!, completed: Boolean!): toDo,
    deleteToDo(id: ID!): toDo,
  }
`;


// Didn't have time to persist the data as I would have liked 
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

    //If you have time add error handling here for if completed value on selected task is already true
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
      let deleteIndex;
      let resObject;
      toDoData.forEach((i, index) => {
        if (args.id === i.id) {
          deleteIndex = index;
          resObject = i; 
        }
      })
      toDoData.splice(deleteIndex, 1)
      return resObject
    }  
    }
  }
;



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);