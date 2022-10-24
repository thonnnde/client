import React, {useState, useEffect, useRef} from 'react';
import { Form } from 'react-bootstrap';


export default function NewTodo({ listId, toggleShowNew, addTodo }) {
    const [autoHeight, updateAutoHeight] = useState(75);
    const textareaStyle = { //inline style
        height: `${autoHeight}px`,
    };

    const newTodoRef = useRef(null);

    useEffect(() =>{
        newTodoRef.current.focus();
    }, []);

    //新增todo
    function handleAddTodo(e) {
        if (e.target.value.trim()){
            addTodo(listId, e.target.value);
        }
        e.target.value ="";
        toggleShowNew();
    }

    //更新高度值
    function autoResize(e) {
        updateAutoHeight(newTodoRef.current.scrollHeight);
    }

    return (
        <Form>
            <Form.Control 
                as="textarea" 
                style={textareaStyle} //inline style
                ref={newTodoRef} 
                onBlur={toggleShowNew}
                onKeyDown={(e) => {
                    if (e.key === "Enter"){
                        handleAddTodo(e);
                    }
                }}
                onInput={autoResize}
            />
        </Form>
    );
}