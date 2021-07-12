import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from './auth/Register'
import "./Kennel.css"

//Look carefully at the <article> tag. In React, we add classes to a component with `className` instead of `class`.
export const Kennel = () => (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("kennel_customer")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    )
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)
