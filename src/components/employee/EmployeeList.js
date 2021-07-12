import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"

export const EmployeeList = () => {
    const { employees, getEmployees } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    const history = useHistory()

    useEffect(() => {
        console.log("EmployeeList: useEffect - getEmployees")
        getLocations()
        .then(getEmployees)
    }, [])

    return (
        <>
            <h2>Employees</h2>
            <button onClick={() => {history.push("/employees/create")}}>
                Add Employee
            </button>
            <div className="employees">
                {console.log("EmployeeList: Render", employees)}
                {
                    employees.map(employee => {
                        const clinic = locations.find(l => l.id === employee.locationId)
                        return <EmployeeCard key={employee.id} location={clinic} employee={employee} />
                    })
                }
            </div>
        </>
    )
}