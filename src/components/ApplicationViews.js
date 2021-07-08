import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalCard } from "./animal/AnimalCard"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { LocationCard } from "./location/LocationCard"
import { EmployeeCard } from "./employee/EmployeeCard"
import { CustomerCard } from "./customer/CustomerCard"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>
            {/* Render the animal list when http://localhost:3000/animal */}
            <AnimalProvider>
            <Route exact path="/animal">
                <AnimalList />
            </Route>
            </AnimalProvider>
            {/* Render the animal list when http://localhost:3000/location */}
            <Route path="/location">
                <LocationCard />
            </Route>
            {/* Render the animal list when http://localhost:3000/employee */}
            <Route path="/employee">
                <EmployeeCard />
            </Route>
            {/* Render the animal list when http://localhost:3000/customer */}
            <Route path="/customer">
                <CustomerCard />
            </Route>
        </>
    )
}