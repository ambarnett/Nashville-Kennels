import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { LocationContext } from '../location/LocationProvider'
import { AnimalContext } from './AnimalProvider'
import { CustomerContext } from '../customer/CustomerProvider'
import "./Animal.css"

export const AnimalForm = () => {
    const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */
    //for edit, hold on to state of animal in this view
    const [animal, setAnimal] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    const { animalId } = useParams()
    const history = useHistory()

    //when a field changes, update state. The return will re-render and display based on the values in state 
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array, 
        always create a copy, make changes, and then set state. */
        const newAnimal = { ...animal }
        /* Animal is an object with properties.
        Set the property to the new value 
        using object bracket notation. */
        newAnimal[event.target.id] = event.target.value
        //update state
        setAnimal(newAnimal)
    }

    const saveNewAnimal = () => {
        addAnimal({
            name: animal.name,
            breed: animal.breed,
            locationId: parseInt(animal.locationId),
            customerId: parseInt(animal.customerId)
        })
            .then(() => history.push(`/animals`))
    }
    const saveEditAnimal = () => {
        updateAnimal({
            id: animal.id,
            name: animal.name,
            breed: animal.breed,
            locationId: parseInt(animal.locationId),
            customerId: parseInt(animal.customerId)
        })
            .then(() => history.push(`/animals/detail/${animal.id}`))
    }
    // handleClickSaveAnimal will just decide which of the above two functions to call
    const handleClickSaveAnimal = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
        if (parseInt(animal.locationId) === 0 || parseInt(animal.customerId) === 0) {
            window.alert("Please select a location and a customer")
        } else {
            //Invoke addAnimal passing the new animal object as an argument
            //Once complete, change the url and display the animal list
            setIsLoading(true)
            if (animalId) {
                //PUT - update
                saveEditAnimal()
            } else {
                //POST - add
                saveNewAnimal()
            }
        }
    }
    useEffect(() => {
        getCustomers().then(getLocations).then(() => {
            if (animalId) {
                getAnimalById(animalId)
                    .then(animal => {
                        setAnimal(animal)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])



    return (
        <form className="animalForm">
            <h2 className="animalForm__title">{animalId ? <>Edit Animal</> : <>New Animal</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Animal name:</label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Animal name" value={animal.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Animal breed:</label>
                    <input type="text" id="breed" required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select name="locationId" id="locationId" className="form-control" value={animal.locationId} onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="customerId">Customer: </label>
                    <select name="customer" id="customerId" className="form-control" value={animal.customerId} onChange={handleControlledInputChange}>
                        <option value="0">Select a customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={handleClickSaveAnimal}>
                {animalId ? <>Save Animal</> : <>Add Animal</>}</button>
        </form>
    )
}