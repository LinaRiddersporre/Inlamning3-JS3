import firebase from 'firebase/app';
import 'firebase/database'
import configuration from '../firebase/firebaseconfig';
import {useState} from 'react'
import { NavLink } from 'react-router-dom';

const Movies = () => {
    const [arrayOfMovies, setArrayOfMovies] = useState([])
    
    
    if(!firebase.apps.length){
        firebase.initializeApp(configuration());
    }

    const getMoviesFromDatabase = () => {
        const movieRef = firebase.database().ref('movies/')
        movieRef.once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let childData = childSnapshot.val()
                setArrayOfMovies(arrayOfMovies => [...arrayOfMovies, childData])
            })
        })
    }

    
    // För att den bara skall hämta arrayn en gång, kanske får göras om sen när den skall uppdateras dynamiskt?
    if(!arrayOfMovies.length > 0){
        getMoviesFromDatabase();
    }

    // Loopa igenom listan med filmer och returnera som element
    const showMovie = () => {
        return(
        arrayOfMovies.map((movie, index) => {
            return (
                <div key={index}> 
                    <NavLink 
                    to={`/movies/${movie.movieTitle}`}
                    ><h2>Filmtitel: {movie.movieTitle}</h2></NavLink>
                    <img src={`${movie.moviePicture}`}/>
                    <p>{movie.shortMovieDescription}</p>
                </div>
            )
        }))
    }

    return(
        <div>
            <h1>Filmtoppen</h1>
            <div>
                {showMovie()}
            </div>
        </div>
    )
}

export default Movies;