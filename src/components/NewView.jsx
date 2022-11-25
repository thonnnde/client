import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { addView, formMapPlan } from "../reducers/routePlanSlice";
import { updateMapPlan } from "../reducers/mapSettingSlice";
import { useDispatch} from 'react-redux';


export default function NewView({ routePlan, listId, toggleShowNew, toggleRouteStatus }) {
    const [autoHeight, updateAutoHeight] = useState(75);
    const textareaStyle = { //inline style
        height: `${autoHeight}px`,
    };
    const dispatch = useDispatch();
    const newViewRef = useRef(null);

    useEffect(() => {
        newViewRef.current.focus();
    }, []);

    //新增View
    function handleAddView(e) {
        // toggleRouteStatus(listId);
        if (e.target.value.trim()) {
            dispatch(addView({ listId, name: e.target.value }));
            const mapPlan = formMapPlan(routePlan, listId);
            dispatch(updateMapPlan(mapPlan))
        }
        e.target.value = "";
        toggleShowNew();
    }

    //更新高度值s
    function autoResize(e) {
        updateAutoHeight(newViewRef.current.scrollHeight);
    }

    return (
        <Form>
            <Form.Control
                as="textarea"
                style={textareaStyle} //inline style
                ref={newViewRef}
                onBlur={toggleShowNew}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAddView(e);
                    }
                }}
                onInput={autoResize}
            />
        </Form>
    );
}