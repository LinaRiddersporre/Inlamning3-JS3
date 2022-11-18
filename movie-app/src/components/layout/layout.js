import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import './_layout.css'

const Layout = () => {
    const location = useLocation()
    const storageId = localStorage.getItem('id')
    useEffect(() => {
        if (location.state !== null) {
            console.log('ja', location.state)
        } 
    })

    const emptyLocalStorage = () => {
        localStorage.clear();
    }
    
    return(
        <div>
            <Header/>
            <nav>
                {(storageId) ? 
                <div className="navbarBody"> 
                    <h1>Hej {storageId}</h1> 
                    <li><NavLink to={'movies'}>Filmlistan</NavLink></li>
                    <li><NavLink 
                    to={'addMovie'}
                    state = {{weAreIn: 'weAreIn'}}
                    >Lägg till film</NavLink></li>
                    <li><NavLink to={'/'} onClick={() => {emptyLocalStorage()}}>Logga ut</NavLink></li> 
                </div> :
                <div className="navbarBody">
                    <li><NavLink to={'login'}>Logga in</NavLink></li>
                    <li><NavLink to={'signUp'}>Registrera</NavLink></li>
                    <li><NavLink to={'movies'}>Filmlistan</NavLink></li>
                </div>}
            </nav>
            <Outlet></Outlet>
            <Footer/>
        </div>
    )
}

export default Layout;