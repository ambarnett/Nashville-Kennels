import React, { useContext, useEffect, useState } from 'react'
import { LocationContext } from './LocationProvider'
import './Location.css'
import { useParams } from 'react-router-dom'

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)

    const [locations, setLocation] = useState({})

    const { locationId } = useParams()

    useEffect(() => {
        console.log("useEffect", locationId)
        getLocationById(locationId)
            .then((response) => {
                setLocation(response)
            })
    }, [])

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
        </section>
    )
}