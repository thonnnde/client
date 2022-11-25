/*global google*/
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { updateResults } from '../reducers/mapSettingSlice';


export default function MapUI({ mapSetting }) {
    const center = { lat: 25.033964, lng: 121.564468}

    const dispatch = useDispatch();

    const [map, setMap] = useState(/** @type google.maps.Map */(null))

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        // libraries: ['place'],
    })

    if (!isLoaded) {
        console.log('not loaded');
    } else {
        console.log('loaded');
    }
    if (loadError) {
        console.log(loadError);
    }

    useEffect(() => {
        console.log("hi")
        calculateRoute();
    }, [mapSetting.status])

    async function calculateRoute() {
        if (mapSetting.status === 'notFound') {
            const directionService = new google.maps.DirectionsService()
            const results = await directionService.route({
                origin: mapSetting.origin,
                destination: mapSetting.destination,
                travelMode: mapSetting.travelMode,
                waypoints: mapSetting.waypoints
            });
            if (results.status === 'OK') {
                dispatch(updateResults(results))
            }
            else {
                console.log(results);
            }
        }
    }

    function clearRoute() {
        dispatch(updateResults(null));
    }

    return (
        <div className="map-container">
            <GoogleMap
                center={center}
                zoom={16}
                mapContainerStyle={{ width: '100%', height: '600px' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            // onLoad={(map) => setMap(map)}
            >
                {mapSetting.status === "found" && <DirectionsRenderer directions={mapSetting.results} />} 
            </GoogleMap>
        </div>
    )

}