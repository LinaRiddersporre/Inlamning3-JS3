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

    const movieRef = firebase.database()

    const getMoviesFromDatabase = () => {
        movieRef.ref('movies/').once('value', (snapshot) => {
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

    

    const deleteMovieButton = (creator) => {
        const id = localStorage.getItem('id')
        if(id===creator){
            return(
                <button type='submit'>Ta bort</button>
            )
        }
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
                    {deleteMovieButton(movie.creator, movie.movieTitle)}
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