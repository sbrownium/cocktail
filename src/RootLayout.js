import React, {useContext} from "react";
import { NavLink, Outlet } from "react-router-dom";
import GitHub from "./GitHub";
import LinkedIn from "./LinkedIn";
import SignIn from "./SignIn";
import { UserContext } from "./UserContext";

export default function RootLayout ({users}) {
const [user] = useContext(UserContext)
    return (
    <>
        <main>
            <Outlet />
        </main>
        <footer>
            <nav>
                <NavLink to='/'>🏠</NavLink>
                <SignIn users={users}/>
                {user &&
                <NavLink to='/Account'>😎</NavLink>} 
                {/* <NavLink to='/NewContainer'>New Drink</NavLink>  */}
                <a href="https://github.com/sbrownium/cocktail">
            <GitHub width='24.5px' height='24px' fillColor='black'/>
          </a>
          <a href="https://linkedin.com/in/sbrownium">
            <LinkedIn width='24.5px' height='24px' fillColor='#2867B2'/>
          </a>
            </nav>
        </footer>
    </>
    )
}