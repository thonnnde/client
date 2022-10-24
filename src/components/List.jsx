import React, {useState} from 'react';
import Todo from "./Todo";
import {Button} from "react-bootstrap";

export default function List({title, list, listId, NewTodo, updateEditState, updateLists}){
    
    const [showNew, updateShowNew] = useState(false);

    //切換NewTodo
    function toggleShowNew(e){
        updateShowNew(!showNew);
    }
    
    return (
        <div className="list p-2 m-1 rounded-lg">
            <div className ="title">{title}</div>
            {list.todos.map((todo, index) => (
                <Todo key={index} todoId={index} name={todo.name} updateEditState={updateEditState} listId={listId}/>
            ))}
            {showNew && React.cloneElement(NewTodo, {toggleShowNew})}
            {!showNew && (
            <div className="footer pt-2  d-flex">
                <Button 
                    className="py-1 flex-grow-1 text-left"
                    onClick={toggleShowNew}
                    >+ New</Button>
            </div>)}
        </div>
    );
}