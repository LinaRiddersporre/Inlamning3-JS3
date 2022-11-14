import { Hidden } from "@mui/material";
import { color, display } from "@mui/system";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import './_layout.css'

const Layout = () => {
    const storageId = localStorage.getItem('id')
    
    const hidden = {
        visibility: 'hidden'
    }

    const visible = {
        visibility: 'visible'
    }

    
    return(
        <div>
            <Header/>
            <nav className="navbarBody">
                <li><NavLink to={'login'}>Logga in</NavLink></li>
                <li><NavLink to={'signUp'}>Registrera</NavLink></li>
                <li><NavLink to={'movies'}>Filmlistan</NavLink></li>
                <li><NavLink 
                to={'addMovie'}
                style={(!storageId) ? hidden : visible}
                >Lägg till film</NavLink></li>
            </nav>
            <Outlet></Outlet>
            <Footer/>
        </div>
    )
}

export default Layout;