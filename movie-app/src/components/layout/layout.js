import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
    return(
        <div>
            <nav>
                <li><NavLink to={'login'}>Logga in</NavLink></li>
                <li><NavLink to={'signUp'}>Registrera</NavLink></li>
                <li><NavLink to={'addMovie'}>Lägg till film</NavLink></li>
                <li><NavLink to={'movies'}>Filmlistan</NavLink></li>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}

export default Layout;