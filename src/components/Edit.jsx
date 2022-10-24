import React, {useRef, useEffect} from 'react';
import { Form } from "react-bootstrap";

export default function Edit({ editState, updateEditState, toggleRouteStatus, updateTodo}) {
    const styles ={
        position: "relative",
        margin: 0,
        ...editState.dimensions,
    };

    const editRef = useRef(null);

    useEffect(() => {
        editRef.current.focus();
    },[]);
 
    function toggleEditShow() {
        updateEditState({
            ...editState,
            show: false,
        });
    }

    //Edit Todo
    function handleUpdateTodo(e) {
        if (e.target.value.trim()){
            toggleRouteStatus(editState.listId);
            updateTodo(editState.listId, editState.todoId, e.target.value);
        }
        e.target.value ="";
        toggleEditShow();
    }


    return (
        <Form className="edit-form" onClick={toggleEditShow}>
            <div>
                <Form.Control 
                    style={styles}
                    ref={editRef} 
                    as="textarea" 
                    row="3"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(editRef.current.getBoundingClientRect());
                        console.log(styles);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter"){
                            handleUpdateTodo(e);
                        }
                    }}
                     />
            </div>
        </Form>
    );

}
