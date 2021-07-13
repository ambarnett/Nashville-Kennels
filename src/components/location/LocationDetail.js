import React, { useContext, useEffect, useState } from 'react'
import { LocationContext } from './LocationProvider'
import './Location.css'
import { useParams, useHistory } from 'react-router-dom'

export const LocationDetail = () => {
    const { getLocationById, removeLocation } = useContext(LocationContext)

    const [locations, setLocation] = useState({})
    const history = useHistory()

    const { locationId } = useParams()

    useEffect(() => {
        console.log("useEffect", locationId)
        getLocationById(locationId)
            .then((response) => {
                setLocation(response)
            })
    }, [])
    const handleRemove = () => {
        removeLocation(locations.id)
        .then(() => {
            history.push("/locations")
        })
    }
    return (
        <section className="location">
            <h3 className="location__name">{locations.name}</h3>
            <div className="location__address">{locations.address}</div>
            <div className="location__animal">Animals at this location:
                <ul>
                    {
                        locations.animals?.map(animal => {
                            return (
                                <>
                                    <li>{animal.name}</li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="location__employee">Employees at this location:
                <ul>
                    {
                        locations.employees?.map(employee => {
                            return (
                                <>
                                    <li>{employee.name}</li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
            <button onClick={handleRemove}>Remove Location</button>
            <button onClick={() => {
                history.push(`/locations/edit/${locations.id}`)
            }}>Edit</button>
        </section>
    )
}