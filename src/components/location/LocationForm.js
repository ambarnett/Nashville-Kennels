import React, { useContext, useEffect, useState } from 'react'
import { LocationContext } from './LocationProvider'
import { useHistory, useParams } from 'react-router-dom'
import './Location.css'

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)

    const [location, setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { locationId } = useParams()
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.id] = event.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = () => {
        if (location.name === "" || location.address === "") {
            window.alert("Please completely fill out the form")
        } else {
            setIsLoading(true)
            if (locationId) {
                updateLocation({
                    id: location.id,
                    name: location.name,
                    address: location.address
                })
                    .then(() => history.push(`/locations/detail/${location.id}`))
            } else {
                addLocation({
                    name: location.name,
                    address: location.address
                })
                    .then(() => history.push("/locations"))
            }
        }
    }

    useEffect(() => {
        if (locationId) {
            getLocationById(locationId)
                .then(location => {
                    setLocation(location)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="locationForm">
            <h2 className="locationForm__title">New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location name: </label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Location name" value={location.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Location address: </label>
                    <input type="text" id="address" required autoFocus className="form-control" placeholder="Location address" value={location.address} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button className="btn btn-primary" disabled={isLoading} onClick={
                (event) => {
                    event.preventDefault()
                    handleClickSaveLocation()
                }
            }>
                {locationId ? <>Save Location</> : <>Add Location</>}
            </button>
        </form>
    )
}