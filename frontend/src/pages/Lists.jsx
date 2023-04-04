import React, { useState, useEffect, useContext } from "react";

import Button from "../components/Button";
import ListWrapper from "../components/ListWrapper";
import PageContainer from "../components/PageContainer";
import TodoListItem from "../components/TodoList";
import TodoListForm from "../components/TodoList/form";
import ErrorMessage from "../components/ErrorMessage";

import UserContext from "../contexts/user";

const AddTodoListForm = ({ addTodoList }) => {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    const newList = {
      name,
      created: new Date()
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d{3}Z/, ""),
    };

    addTodoList(newList);

    setName("");
    setShowForm(false);
  };

  return showForm ? (
    <TodoListForm
      onSuccess={handleSubmit}
      onCancel={() => setShowForm(false)}
      name={name}
      setName={setName}
    />
  ) : (
    <div style={{ width: "100%" }}>
      <Button style={{ margin: "1rem 0" }} onClick={() => setShowForm(true)}>
        + Add List
      </Button>
    </div>
  );
};

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState("");

  const [user] = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8000/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setLists(data.lists))
      .catch((error) => console.log(error));
  }, [user]);

  const handleAddList = (newList) => {
    if (lists.find(({ name }) => name === newList.name.trim())) {
      setError("List with this name already exists");
      return;
    }
    if (newList.name) {
      fetch("http://localhost:8000/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify(newList),
      })
        .then((res) => res.json())
        .then((data) => setLists([...lists, data.list]))
        .catch((error) => console.log(error));
    }
  };

  const updateList = (updatedList) => {
    fetch(`http://localhost:8000/list/${updatedList._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(updatedList),
    })
      .then((res) => res.json())
      .then((data) => {
        setLists(
          lists.map((list) =>
            list._id === data.list._id ? { ...list, ...data.list } : list
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const deleteList = (deletedList) => {
    fetch(`http://localhost:8000/list/${deletedList._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));

    setLists(lists.filter((list) => list._id !== deletedList._id));
  };

  const onListChange = (list) => {
    updateList(list);
  };

  const onListDelete = (list) => {
    deleteList(list);
  };

  return (
    <PageContainer pageName={"TODO Lists"}>
      <div>
        <h2>Your Lists</h2>
        {lists.length === 0 ? (
          <p>You haven't created any lists yet.</p>
        ) : (
          <ListWrapper
            items={lists.map((item) => ({
              ...item,
              onListChange,
              onListDelete,
            }))}
            childComponent={TodoListItem}
          />
        )}

        <AddTodoListForm addTodoList={handleAddList} />
      </div>
      <ErrorMessage errorMsg={error} />
    </PageContainer>
  );
};

export default ListsPage;
