import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout () {
    return (
    <>
        <main>
            <Outlet />
        </main>
        <footer>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/Account'>Account</NavLink> 
                <NavLink to='/NewContainer'>New Drink</NavLink> 
            </nav>
        </footer>
    </>
    )
}