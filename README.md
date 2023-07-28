  # todo-server
A proof of concept server made with Apollo &amp; GraphQL to support a client "to-do" list functionality.

## Getting Started

Clone the repo into directory of your choice.

```
  git clone git@github.com:EvanMcGrath/todo-server.git
```

Go into the project directory.

```
cd todo-server/
```

Install dependencies.

```
  npm install
```

Run server. (This script compiles the TS into JS within the ./dist/ folder and initiates it with node).

```
  npm start
```

## Queries 

### AllToDos
```
 query AllToDos {
    allToDos {
      id
      task
      completed
    }
  }
```
| Description                       |
| :-------------------------------- |
| This will provide the list of all completed and incomplete to-do tasks | 

### ActiveToDos
```
 query ActiveToDos {
    activeToDos {
      id
      task
      completed
    }
  }
```
| Description                       |
| :-------------------------------- |
| This query provides the list of all tasks yet to be completed | 


## Mutations 

### CreateToDo 

```
 mutation CreateToDo {
    createToDo(task: String!, completed: Boolean!) {
        id
        task
        completed
    }
}
```
| Description                       |
| :-------------------------------- |
| This mutation needs two parameters a string for the task and a boolean to signify the status of the task. It responds to the client with the to-do that has been created. | 

### UpdateToDO 

```
 mutation UpdateToDo {
    updateToDo(id: ID!, completed: Boolean!) {
        id
        task
        completed
    }
}
```
| Description                       |
| :-------------------------------- |
| This mutation needs an ID to select the to-do to be updated with the Boolean value of true. It responds to the client with the to-do that has been updated. | 

### DeleteToDo 

```
mutation DeleteToDo {
    deleteToDo(id: null) {
        id
        task
        completed
    }
}
```
| Description                       |
| :-------------------------------- |
| This mutation needs an ID to select the to-do to be deleted from the data set.  It responds to the client with the to-do that has been deleted. | 


