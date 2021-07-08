import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { CustomerList } from "./customer/CustomerList"
import { CustomerProvider } from "./customer/CustomerProvider"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>
            {/* Render the animal list when http://localhost:3000/animal */}
            <AnimalProvider>
            <Route exact path="/animals">
                <AnimalList />
            </Route>
            </AnimalProvider>
            {/* Render the animal list when http://localhost:3000/location */}
            <LocationProvider>
            <Route exact path="/locations">
                <LocationList />
            </Route>
            </LocationProvider>
            {/* Render the animal list when http://localhost:3000/employee */}
            <EmployeeProvider>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            </EmployeeProvider>
            {/* Render the animal list when http://localhost:3000/customer */}
            <CustomerProvider>
            <Route exact path="/customers">
                <CustomerList />
            </Route>
            </CustomerProvider>
        </>
    )
}