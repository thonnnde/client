import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import KanBanNav from "./KanBanNav";
import List from "./List";
import NewTodo from './NewTodo';
import Edit from './Edit';
import MapBoard from './MapBoard';

export default function KanBan() {
  const dummyData = [
    {
      title: "我的行程",
      //景點List
      todos: [
        {
          name: "台北動物園",
          finished: false,
        },
        {
          name: "公館夜市",
          finished: false,
        },
        {
          name: "台北植物園",
          finished: false,
        },
        {
          name: "台北車站",
          finished: false,
        }
      ],
      //行程List
      response: null,
      status: ""
    },
  ];
  const [lists, updateLists] = useState(dummyData);

  //修改框的state
  const [editState, updateEditState] = useState({
    show: false,
    dimensions: { top: 0, left: 0, width: 0 }, //position
    value: "",
    listId: 0,
    todoId: 0,
  });


  function addTodo(listIndex, newTodo) {
    let newLists = [...lists];
    newLists[listIndex].todos.push({ name: newTodo, finished: false });
    updateLists(newLists);
  }

  function toggleRouteStatus(listIndex){
    let newLists = [...lists];
    newLists[listIndex].status = "NOTOK";
    updateLists(newLists);
  }

  function updateTodo(listIndex, todoIndex, updatedTodo) {
    let newLists = [...lists];
    newLists[listIndex].todos[todoIndex] = { name: updatedTodo, finished: false };
    updateLists(newLists);
  }

  function updateResponse(ListId, updatedResponse){
    let newLists = [...lists];
    newLists[ListId].response = updatedResponse;
    newLists[ListId].status = "OK";
    updateLists(newLists);
  }

  return (
    <span>
      <KanBanNav></KanBanNav>
      {lists.map((list, index) => (<MapBoard listId={index} list={list} updateResponse={updateResponse} >map</MapBoard>))}
      <Container fluid className="board p-1">
        <Row className="m-0">
          {lists.map((list, index) => (
            <List
              key={index}
              list={list}
              listId={index}
              addTodo={addTodo}
              updateLists={updateLists}
              updateEditState={updateEditState}
              NewTodo={<NewTodo listId={index} addTodo={addTodo} />}
            />
          ))}
        </Row>
        {editState.show &&
          <Edit
            editState={editState}
            updateEditState={updateEditState}
            updateTodo={updateTodo}
            toggleRouteStatus={toggleRouteStatus}>
          </Edit>}
      </Container>
    </span>
  );
}