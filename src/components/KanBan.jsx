import React, { useState } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import KanBanNav from "./KanBanNav";
import List from "./List";
import NewTodo from './NewTodo';
import Edit from './Edit';
import MapBoard from './MapBoard';


export default function KanBan() {
  const dummyData = [
    {
      title: "day1",
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
    {
      title:"day2",
      todos: [
        {
          name:'阿底旦文化故事館',
          finished: false,
        },
        {
          name:'大武彩虹街',
          finished: false, 
        },
        {
          name:'南田部落',
          finished:false,
        },
        {
          name:'南田海岸親水公園',
          finished: false,
        },
        {
          name:'森永部落',
          finished: false,
        }, 
        {
          name:'VuVu野菜農園',
          finished: false,
        }
      ],
      response: null,
      status:""
    }
  ];
  const [lists, updateLists] = useState(dummyData);
  //Carousel 的State
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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

  function toggleRouteStatus(listIndex) {
    let newLists = [...lists];
    newLists[listIndex].status = "NOTOK";
    updateLists(newLists);
  }

  function updateTodoList(listIndex, updatedTodoList){
    let newLists = [...lists];
    newLists[listIndex].todos = updatedTodoList;
    updateLists(newLists);
  }

  function updateTodo(listIndex, todoIndex, updatedTodo) {
    let newLists = [...lists];
    newLists[listIndex].todos[todoIndex] = { name: updatedTodo, finished: false };
    updateLists(newLists);
    console.log(...lists);
    console.log(editState);
  }

  function updateResponse(ListId, updatedResponse) {
    let newLists = [...lists];
    newLists[ListId].response = updatedResponse;
    newLists[ListId].status = "OK";
    updateLists(newLists);
  }

  return (
    <span>
      <KanBanNav></KanBanNav>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {lists.map((list, index) => (<Carousel.Item key={index}>
            <MapBoard listId={index} list={list} updateResponse={updateResponse} >map</MapBoard>
            <Container fluid className="board p-1">
              <Row className="m-0">
                <List
                  key={index}
                  list={list} 
                  listId={index}
                  addTodo={addTodo}
                  updateTodoList={updateTodoList}
                  updateEditState={updateEditState}
                  toggleRouteStatus={toggleRouteStatus}
                  NewTodo={<NewTodo toggleRouteStatus={toggleRouteStatus} listId={index} addTodo={addTodo} />}
                />
              </Row>
              {editState.show &&
                <Edit
                  key={index}
                  editState={editState}
                  updateEditState={updateEditState}
                  updateTodo={updateTodo}
                  toggleRouteStatus={toggleRouteStatus}>
                </Edit>}
            </Container>
        </Carousel.Item>))}
      </Carousel>
    </span >
  );
}