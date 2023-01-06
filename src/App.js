import "./App.css";
import { v4 as uuid } from "uuid";

import { Button, Divider, Grid } from "@mui/material";
import { useState } from "react";
import ToDoCard from "./components/Display/ToDoCard";
import AddDialog from "./components/Form/AddDialog";
import { Todos } from "./Todos";

export const priorities = ["High", "Average", "Low"];

function App() {
  const [newObject, setNewObject] = useState({
    id: "",
    title: "",
    description: "",
    priority: undefined,
    color: "",
  });

  const [todoList, setTodoList] = useState(Todos);

  const [openAdd, setOpenAdd] = useState(false);

  const id = () => {
    return uuid().slice(0, 8);
  };

  const addTodo = () => {
    setOpenAdd(false);
    setTodoList((li) => [...li, { ...newObject, id: id(), state: "open" }]);
    console.log(todoList);
  };

  const updateTodo = (todo) => {
    const newList = todoList.map((object) => {
      if (object.id === todo.id) {
        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          color: todo.color,
          state: todo.state,
        };
      }
      return object;
    });

    console.log(newList);

    setTodoList(newList);
  };

  const deleteTodo = (todo) => {
    setTodoList(todoList.filter((x) => x.id !== todo.id));
  };

  const deleteAllTodos = () => {
    setTodoList([]);
  };

  const duplicateTodo = (todo) => {
    setTodoList((list) => [...list, { ...todo, id: id() }]);
  };

  return (
    <div className="mainContainer">
      <h1>My ToDo List</h1>
      <div className="buttonGroup">
        <Button
          sx={{ marginRight: "15px" }}
          variant="contained"
          onClick={() => setOpenAdd(true)}
        >
          Add New
        </Button>
        <Button
          sx={{ marginRight: "15px" }}
          variant="outlined"
          onClick={deleteAllTodos}
        >
          Clear All
        </Button>
      </div>

      <div className="cardContainer">
        <h2>To work on:</h2>
        <Grid container spacing={1}>
          {todoList
            .filter((x) => x.state === "open")
            .map((x) => (
              <Grid item>
                <ToDoCard
                  updateTodo={updateTodo}
                  todo={x}
                  duplicateTodo={duplicateTodo}
                  deleteTodo={deleteTodo}
                />
              </Grid>
            ))}
        </Grid>
      </div>

      <Divider variant="middle" />

      <div className="cardContainer">
        <h2>Done:</h2>
        <Grid container spacing={1}>
          {todoList
            .filter((x) => x.state !== "open")
            .map((x) => (
              <Grid item>
                <ToDoCard
                  updateTodo={updateTodo}
                  todo={x}
                  duplicateTodo={duplicateTodo}
                  deleteTodo={deleteTodo}
                />
              </Grid>
            ))}
        </Grid>
      </div>

      <AddDialog
        newObject={newObject}
        open={openAdd}
        setNewObject={setNewObject}
        setOpen={setOpenAdd}
        triggerTodo={addTodo}
      />
    </div>
  );
}

export default App;
