import React, { useState, createContext } from "react"

export const LocationContext = createContext() 

export const LocationProvider = (props) => {
    const [locations, setLocations ] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setLocations)
    }

    const addLocation = locationObj => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(res => res.json())
    }

    const getLocationById = (id) => {
        return fetch(`http://localhost:8088/locations/${id}?_embed=employees&_embed=animals`)
        .then(res => res.json())
    }

    const removeLocation = (locationId) => {
        return fetch(`http://localhost:8088/locations/${locationId}`, {
            method: "DELETE"
        })
        .then(getLocations)
    }

    const updateLocation = (location) => {
        return fetch(`http://localhost:8088/locations/${location.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
        .then(getLocations)
    }
    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, getLocationById, removeLocation, updateLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}