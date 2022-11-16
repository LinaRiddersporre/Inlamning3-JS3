import { Hidden } from "@mui/material";
import { color, display } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import './_layout.css'

const Layout = () => {
    const location = useLocation()
    const [addMovieLink, setAddMovieLink] = useState()
    // const storageId = localStorage.getItem('id')
    useEffect(() => {
        if (location.state !== null) {
            console.log('ja', location.state)
        } 
    })

    
    return(
        <div>
            <Header/>
            <nav className="navbarBody">
                <li><NavLink to={'login'}>Logga in</NavLink></li>
                <li><NavLink to={'signUp'}>Registrera</NavLink></li>
                <li><NavLink to={'movies'}>Filmlistan</NavLink></li>
                <li><NavLink 
                to={'addMovie'}
                state = {{weAreIn: 'weAreIn'}}
                style= { (!localStorage.getItem('id')) ? {visibility: 'hidden'} : {visibility: 'visible'}}
                
                >Lägg till film</NavLink></li>
            </nav>
            <Outlet></Outlet>
            <Footer/>
        </div>
    )
}

export default Layout;