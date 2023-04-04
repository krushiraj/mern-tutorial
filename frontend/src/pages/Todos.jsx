import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../components/Button";
import ListWrapper from "../components/ListWrapper";
import PageContainer from "../components/PageContainer";
import TodoItem from "../components/TodoItem";
import TodoItemForm from "../components/TodoItem/form";
import ProgressBar from "../components/ProgressBar";
import UserContext from "../contexts/user";

const AddTodoItemForm = ({ addTodoItem }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    const newTodo = {
      title,
      description,
      state: "TODO",
      _id: (Math.random().toFixed(1) * 10).toString(),
      created: new Date()
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d{3}Z/, ""),
    };
    addTodoItem(newTodo);
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  return showForm ? (
    <TodoItemForm
      onSuccess={handleSubmit}
      onCancel={() => setShowForm(false)}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
    />
  ) : (
    <div style={{ width: "100%" }}>
      <Button style={{ margin: "1rem 0" }} onClick={() => setShowForm(true)}>
        + Add Todo
      </Button>
    </div>
  );
};

const TodoListPage = () => {
  const [user] = useContext(UserContext);
  const { id } = useParams();
  const [list, setList] = useState({});
  const [todos, setTodos] = useState([]);

  // Fetch the todo list from the server
  useEffect(() => {
    fetch(`http://localhost:8000/list/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data.list);
      })
      .catch((error) => console.error(error));
    fetch(`http://localhost:8000/todo?listId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
      })
      .catch((error) => console.error(error));
  }, [id, user]);

  // Calculate the progress of the todo list
  const calculateProgress = () =>
    Math.round((list.doneCount / (list.totalCount || 1)) * 100);

  // Update the state of a todo item
  const updateTodoItem = (updatedTodo) => {
    fetch(`http://localhost:8000/todo/${updatedTodo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data.list);
        const updatedTodos = todos.map((todo) => {
          if (todo._id === data.todo._id) {
            return { ...todo, ...data.todo };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((error) => console.error(error));
  };

  // Add a new todo item to the list
  const addTodoItem = (newTodo) => {
    fetch(`http://localhost:8000/todo?listId=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data.todo]);
        setList(data.list);
      })
      .catch((error) => console.error(error));
  };

  // Delete a todo item from the list
  const deleteTodoItem = (deletedTodo) => {
    fetch(`http://localhost:8000/todo/${deletedTodo._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(todos.filter((todo) => todo._id !== deletedTodo._id));
        setList(data.list);
      })
      .catch((error) => console.error(error));
  };

  const onTodoChange = (updatedTodo) => {
    updateTodoItem(updatedTodo);
  };

  const onTodoDelete = (todo) => {
    deleteTodoItem(todo);
  };

  return (
    <PageContainer pageName="TODOs">
      {!user ? (
        <>
          <p>You need to be logged in to view this page.</p>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <div>
          <h2>{list.name}</h2>
          <p>Created: {list.created}</p>
          {todos.length === 0 ? (
            <p>No TODOs yet!</p>
          ) : (
            <>
              <ProgressBar progress={calculateProgress()} />
              <ListWrapper
                childComponent={TodoItem}
                items={todos.map((todo) => ({
                  ...todo,
                  onTodoChange,
                  onTodoDelete,
                }))}
              />
            </>
          )}
          <AddTodoItemForm addTodoItem={addTodoItem} />
        </div>
      )}
    </PageContainer>
  );
};

export default TodoListPage;
