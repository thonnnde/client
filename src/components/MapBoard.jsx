import React, { useState } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, useLoadScript } from "@react-google-maps/api";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';


export default function MapBoard({ listId, list, updateResponse}) {
    const { isLoaded, loadError } = useLoadScript({
        id: 'script-loader',
        version: 'weekly',
        googleMapsApiKey: "AIzaSyDOhTegV0-X10RYdbgQwwP7acLrluHoX4M",
    })

    const options = {
        // mapId:'45b41d76d6b60f19',
        zoomControlOptions: {
            position: 'RIGHT_CENTER'
        }
    }

   

    //取得google api response後的function
    function directionsCallback(response) {
        console.log(response)
        if (response !== null) {
            if (response.status === "OK") {
                updateResponse(listId, response)
            } else {
                console.log("reponse: ", response)
            }
        }
    }

    //取得waypoints資
    function getWaypoint(todo) {
        return (
            {
                location: todo.name,
                stopover: true
            })
    }
    //response: null,
    // origin: lists[0].todos[0].name,
    // destination: lists[0].todos[lists[0].todos.length - 1].name,
    // travelMode: 'DRIVING',
    // waypoints: lists[0].todos.slice(1, -1).map(getWaypoint),
    const renderMap = () => {
        return (
            <div className="map-container">
                <GoogleMap
                    id='direction-example'
                    mapContainerStyle={{
                        height: '400px',
                        width: '100%'
                    }}
                    zoom={4}    
                    center={{
                        lat: 0,
                        lng: -180
                    }}
                    options={options}
                    >   

                    console.log(list);
                    {list.todos[0].name !== null && list.status !== "OK" && (<DirectionsService
                        options={{
                            origin: list.todos[0].name,
                            destination: list.todos[list.todos.length - 1].name,
                            travelMode: 'DRIVING',
                            waypoints: list.todos.slice(1, -1).map(getWaypoint),
                        }}
                        callback={directionsCallback}
                    />)
                    }
                    {list.response !== null && list.status === "OK"  && (<DirectionsRenderer
                        options={{
                            directions: list.response,
                        }}
                    />)
                    }


                </GoogleMap>
            </div>
        )
    }
    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }
    return isLoaded ? renderMap() : <Spinner />
}

