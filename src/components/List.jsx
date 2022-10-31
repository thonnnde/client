import React, { useState } from 'react';
import Todo from "./Todo";
import { Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move'

export default function List({ title, list, listId, NewTodo, updateEditState, updateTodoList, toggleRouteStatus }) {

    const [showNew, updateShowNew] = useState(false);

    //切換NewTodo
    function toggleShowNew(e) {
        updateShowNew(!showNew);
    }
    //導航頁面
    const [showRoute, updateShowRoute] = useState(false);
    const handleClose = () => updateShowRoute(false);
    const handleShow = () => updateShowRoute(true);

    const SortableTodoContainer = sortableContainer(({ children }) => <div className="todo">{children}</div>);

    const SortableTodo = sortableElement(({ todo, updateEditState, listId, todoId }) => <Todo key={todo} todoId={todoId} name={todo.name} updateEditState={updateEditState} listId={listId} />);

    function onSortEnd(oldIndex, newIndex) {
        // toggleRouteStatus(listId)
        console.log(arrayMoveImmutable(list.todos, oldIndex, newIndex))
        updateTodoList(listId, (arrayMoveImmutable(list.todos, oldIndex, newIndex)))
    }

    return (
        <div className="list p-2 m-1 rounded-lg">
            <div className="title">{title}</div>
            <SortableTodoContainer axis="y" onSortEnd={onSortEnd}>
                {list.todos.map((todo, index) => (
                    <SortableTodo index={index} todo={todo} updateEditState={updateEditState} listId={listId} todoId={index} />
                ))} 
            </SortableTodoContainer>
            {showNew && React.cloneElement(NewTodo, { toggleShowNew })}
            {!showNew && (
                <div className="footer pt-2  d-flex">
                    <Button
                        className="py-1 flex-grow-1 text-left"
                        onClick={toggleShowNew}
                    >+ New</Button>
                </div>)}
            <Button variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faRoute} />
            </Button>
            <Offcanvas show={showRoute} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>行程導航</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {list.response != null && list.response.routes[0].legs.map((leg, index) =>
                        <div className="routePanel">
                            <Card style={{ width: '18rem' }} key={index}>
                                <Card.Body>
                                    <Card.Title>{"第" + (index + 1) + "段"}</Card.Title>
                                    <Card.Text>
                                        <div>{"出發地址: " + leg.start_address}</div>
                                        <div>{"目的地址: " + leg.end_address}</div>
                                        <div>{"距離: " + leg.distance.text}</div>
                                        <div>{"時長: " + leg.duration.text}</div>

                                    </Card.Text>
                                    <Button variant="primary">詳細資料</Button>
                                </Card.Body>
                            </Card>

                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}