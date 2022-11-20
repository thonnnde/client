import React, { useState, useRef } from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Todo({ editState, id, todoId, name, listId, updateEditState }) {
    const [isOver, setIsOver] = useState(false);
    const targetRef = useRef(null);
    const { setNodeRef, listeners, transform, transition } = useSortable({id})
    const styles = {
        marginTop: "10px",
        transform: CSS.Translate.toString(transform),
        transition,
    }

    function handleOnOver() {
        setIsOver(true);
    }

    function handleOnLeave() {
        setIsOver(false);
    }
    //edit 按鈕功能
    function handleClickEdit() {
        const { top, left, width } = targetRef.current.getBoundingClientRect
        console.log('top: ' + top + ' left: ' + left + ' width:' + width);
        updateEditState({
            show: true,
            dimensions: { top: top, left: left, width: width },
            value: name,
            listId: listId,
            todoId: todoId
        });
        
    }

    return (
        <div ref={setNodeRef}
            {...listeners}
            style={styles}
        >
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
        </div>
    );
}