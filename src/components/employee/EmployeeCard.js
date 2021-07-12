import React from "react"
import "./Employee.css"

export const EmployeeCard = ({ employee, location }) => (
    <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <div className="location__address">{location.name}</div>
    </section>
)