import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout () {
    return (
    <>
        <header>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/Account'>Account</NavLink>   
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
    </>
    )
}