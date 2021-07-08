import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"

export const AnimalList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("AnimalsList: useEffect - getAnimals")
        getAnimals()

    }, [])//WHY ARE THESE EMPTY SQUARE BRACKETS HERE??

    return ( 
        <div className="animals">
            {console.log("AnimalList: Render", animals)}
            {
                animals.map(animal => {
                    return <AnimalCard key={animal.id} animal={animal} />
                })
            }
        </div>
    )
}