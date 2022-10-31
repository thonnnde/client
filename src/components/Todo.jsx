import React, { useState, useRef } from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";


export default function Todo({ todoId, name, listId, updateEditState }) {
    const [isOver, setIsOver] = useState(false);
    const targetRef = useRef(null);

    function handleOnOver() {
        setIsOver(true);
    }

    function handleOnLeave() {
        setIsOver(false);
    }

    function handleClickEdit() {
        const { top, left, width } = targetRef.current.getBoundingClientRect();
        console.log(top, left, width);
        updateEditState({
            show: true,
            dimensions: {
                top: top,
                left: left,
                width: width,
            },
            value: name,
            listId: listId,
            todoId: todoId
        });
    }

    return (
        <div className="todo my-1 p-1 rounded"
            onMouseEnter={handleOnOver}
            onMouseLeave={handleOnLeave}
            ref={targetRef}
        >
            {name}
            {isOver && (
                <Button className="edit-button m-1" size="sm" onClick={handleClickEdit}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Button>)}
        </div>
    );
}